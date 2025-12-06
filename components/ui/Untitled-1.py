
import numpy as np

def solve_cvrp(tank_capacity, no_of_house, water_demands, distance_matrix):
    """
    Solves the Capacitated Vehicle Routing Problem (CVRP) using the 
    Clarke and Wright Savings Algorithm.

    Args:
        tank_capacity (int): The maximum capacity of a single tanker (e.g., 8000).
        no_of_house (int): The number of houses to deliver to.
        water_demands (list): A list of water demands for each house. 
                              The index 0 corresponds to House 1, index 1 to House 2, etc.
        distance_matrix (list of lists): A (no_of_house + 1) x (no_of_house + 1) matrix
                                         where matrix[0] is the Hub, 
                                         matrix[1] is House 1, etc.
    """
    
    print(f"--- Starting CVRP Solver ---")
    print(f"Tank Capacity: {tank_capacity}L")
    print(f"Number of Houses: {no_of_house}\n")

    # --- Step 1: Create a demands dictionary for easy lookup ---
    # We use 1-based indexing for houses (House 1, House 2, etc.)
    # water_demands[0] -> House 1
    # water_demands[1] -> House 2
    demands = {i + 1: water_demands[i] for i in range(no_of_house)}

    # --- Step 2: Calculate All Savings ---
    savings_list = []
    for i in range(1, no_of_house + 1):
        for j in range(i + 1, no_of_house + 1):
            # Saving formula: S(i,j) = d(Hub,i) + d(Hub,j) - d(i,j)
            saving = (distance_matrix[0][i] + 
                      distance_matrix[0][j] - 
                      distance_matrix[i][j])
            
            savings_list.append((saving, i, j))

    # --- Step 3: Sort the Savings List (Highest to Lowest) ---
    savings_list.sort(key=lambda x: x[0], reverse=True)

    # --- Step 4: Initialize Routes ---
    # Start with the "dumb" solution: one route for every house
    # We also use a map to quickly find which route a house is in
    routes = {i + 1: [i + 1] for i in range(no_of_house)}
    route_loads = {i + 1: demands[i + 1] for i in range(no_of_house)}
    house_to_route = {i + 1: i + 1 for i in range(no_of_house)}

    # --- Step 5: Build the Routes (The Main Loop) ---
    for saving, i, j in savings_list:
        
        # Find which routes houses i and j are currently in
        route_id_i = house_to_route[i]
        route_id_j = house_to_route[j]

        # Check 1: Are they already on the same route? If so, skip.
        if route_id_i == route_id_j:
            continue

        # Get the actual route lists and loads
        route_list_i = routes[route_id_i]
        route_list_j = routes[route_id_j]
        load_i = route_loads[route_id_i]
        load_j = route_loads[route_id_j]

        # Check 2: (CRITICAL) Capacity Check
        if load_i + load_j > tank_capacity:
            continue  # Merging would exceed tanker capacity

        # Check 3: Endpoint Check
        # We can only merge if i and j are at the *ends* of their
        # respective routes (closest to the Hub).
        
        merged = False
        new_route = []

        if route_list_i[-1] == i and route_list_j[0] == j:
            # Merge: [..i] + [j..]
            new_route = route_list_i + route_list_j
            merged = True
        elif route_list_i[-1] == i and route_list_j[-1] == j:
            # Merge: [..i] + [..j] (reverse j)
            new_route = route_list_i + route_list_j[::-1]
            merged = True
        elif route_list_i[0] == i and route_list_j[0] == j:
            # Merge: [i..] (reverse i) + [j..]
            new_route = route_list_i[::-1] + route_list_j
            merged = True
        elif route_list_i[0] == i and route_list_j[-1] == j:
            # Merge: [j..] + [i..]
            new_route = route_list_j + route_list_i
            merged = True
        
        # If a valid merge happened:
        if merged:
            # Update the route and its load
            routes[route_id_i] = new_route
            route_loads[route_id_i] = load_i + load_j
            
            # Re-map all houses from the (now deleted) route j
            for house in route_list_j:
                house_to_route[house] = route_id_i
            
            # Delete the old route j
            del routes[route_id_j]
            del route_loads[route_id_j]

    # --- Step 6: Format and Print the Final Solution ---
    print("\n--- ✅ Final Optimized Routes ---")
    
    total_distance = 0
    
    def calculate_route_distance(route_list, matrix):
        """Helper to calculate total distance of one route."""
        if not route_list:
            return 0
        dist = matrix[0][route_list[0]]  # Hub -> first house
        for k in range(len(route_list) - 1):
            dist += matrix[route_list[k]][route_list[k+1]]
        dist += matrix[route_list[-1]][0]  # last house -> Hub
        return dist

    for i, (route_id, route_list) in enumerate(routes.items()):
        route_load = route_loads[route_id]
        route_dist = calculate_route_distance(route_list, distance_matrix)
        total_distance += route_dist
        
        # Build the path string
        path_str = "Hub -> " + " -> ".join(map(str, route_list)) + " -> Hub"
        
        print(f"\nTanker Trip {i + 1}:")
        print(f"  Route: {path_str}")
        print(f"  Water Delivered: {route_load}L / {tank_capacity}L")
        print(f"  Route Distance: {route_dist} km")

    print("\n-------------------------------------")
    print(f"Total Tanker Trips (Routes): {len(routes)}")
    print(f"Total Combined Distance: {total_distance} km")
    
    # Note on 'no_of_tankers' input
    print("\n**Note:** The 'no_of_tankers' input is not used as a *constraint* in this")
    print("algorithm. This algorithm *determines* the minimum number of trips")
    print("needed, which is the result shown above.")


# --- ---------------------------------------------------- ---
# --- ⬇️ (1) DEFINE YOUR BUSINESS'S INPUT DATA HERE ⬇️ ---
# --- ---------------------------------------------------- ---

# (INPUT 1)
MY_TANK_CAPACITY = 8000

# (INPUT 2)
MY_NUM_HOUSES = 8

# (INPUT 3) - Array of water requirements
# (House 1=2000L, House 2=3000L, ..., House 8=4000L)
MY_WATER_DEMANDS = [
    2000, 3000, 4500, 1500, 2500, 3500, 1000, 4000
]

# (INPUT 4) - Distance Matrix (Must be (N+1) x (N+1))
# Row 0/Col 0 = Hub
# Row 1/Col 1 = House 1
# Row 2/Col 2 = House 2
# ...
# Row 8/Col 8 = House 8
# (Using numpy for readability, but it's just a list of lists)
MY_DISTANCE_MATRIX = np.array([
# H   1   2   3   4   5   6   7   8  (To)
  [ 0, 10, 12,  8, 11, 15,  9,  7,  6], # 0 (From Hub)
  [10,  0,  5, 13,  9,  7, 10, 11, 16], # 1 (From House 1)
  [12,  5,  0, 10,  8,  6, 11, 13, 17], # 2 (From House 2)
  [ 8, 13, 10,  0, 10, 18, 15, 10,  4], # 3 (From House 3)
  [11,  9,  8, 10,  0,  4,  6,  5, 14], # 4 (From House 4)
  [15,  7,  6, 18,  4,  0,  5,  9, 20], # 5 (From House 5)
  [ 9, 10, 11, 15,  6,  5,  0,  3, 12], # 6 (From House 6)
  [ 7, 11, 13, 10,  5,  9,  3,  0, 10], # 7 (From House 7)
  [ 6, 16, 17,  4, 14, 20, 12, 10,  0]  # 8 (From House 8)
]).tolist() # Convert to standard list of lists

# (INPUT 5) - Number of tankers you own
MY_NUM_TANKERS = 4 # (See note in output - this isn't used by C&W)


# --- --------------------------------- ---
# --- ⬇️ (2) RUN THE SOLVER ⬇️ ---
# --- --------------------------------- ---

solve_cvrp(
    MY_TANK_CAPACITY,
    MY_NUM_HOUSES,
    MY_WATER_DEMANDS,
    MY_DISTANCE_MATRIX
)