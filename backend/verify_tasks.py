import requests
import sys
import time
import subprocess
import os

BASE_URL = "http://localhost:8001"

def run_verification():
    print("Starting verification...")

    # 1. Fetch all tasks (should have initial migration data)
    print("\n1. Fetching all tasks...")
    response = requests.get(f"{BASE_URL}/tasks")
    if response.status_code != 200:
        print(f"FAILED: GET /tasks returned {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    tasks = response.json().get("tasks", [])
    print(f"Found {len(tasks)} tasks.")
    if len(tasks) < 3:
        print("FAILED: Expected at least 3 tasks from migration.")
        sys.exit(1)
    
    # 2. Create a new task
    print("\n2. Creating a new task...")
    new_task = {
        "title": "Verify API",
        "description": "Run the verification script",
        "status": "in-progress",
        "assignee_name": "Antigravity",
        "assignee_avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Antigravity"
    }
    response = requests.post(f"{BASE_URL}/tasks", json=new_task)
    if response.status_code != 201:
        print(f"FAILED: POST /tasks returned {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    created_task = response.json()
    task_id = created_task["id"]
    print(f"Created task with ID: {task_id}")
    
    if created_task["title"] != new_task["title"]:
        print("FAILED: Title mismatch.")
        sys.exit(1)

    # 3. Update the task
    print("\n3. Updating the task...")
    update_data = {
        "status": "done"
    }
    response = requests.put(f"{BASE_URL}/tasks/{task_id}", json=update_data)
    if response.status_code != 200:
        print(f"FAILED: PUT /tasks/{task_id} returned {response.status_code}")
        print(response.text)
        sys.exit(1)
    
    updated_task = response.json()
    if updated_task["status"] != "done":
        print("FAILED: Status not updated.")
        sys.exit(1)
    print("Task updated successfully.")

    # 4. Verify update with GET
    print("\n4. Verifying update with GET...")
    response = requests.get(f"{BASE_URL}/tasks")
    tasks = response.json().get("tasks", [])
    found = False
    for task in tasks:
        if task["id"] == task_id:
            found = True
            if task["status"] != "done":
                print(f"FAILED: Task status in GET list is {task['status']}, expected 'done'.")
                sys.exit(1)
            break
    if not found:
        print("FAILED: Updated task not found in list.")
        sys.exit(1)
    print("Update verified.")

    # 5. Delete the task
    print("\n5. Deleting the task...")
    response = requests.delete(f"{BASE_URL}/tasks/{task_id}")
    if response.status_code != 204:
        print(f"FAILED: DELETE /tasks/{task_id} returned {response.status_code}")
        print(response.text)
        sys.exit(1)
    print("Task deleted successfully.")

    # 6. Verify deletion
    print("\n6. Verifying deletion...")
    response = requests.get(f"{BASE_URL}/tasks")
    tasks = response.json().get("tasks", [])
    for task in tasks:
        if task["id"] == task_id:
            print("FAILED: Deleted task still exists.")
            sys.exit(1)
    print("Deletion verified.")

    print("\nVerification PASSED!")

if __name__ == "__main__":
    # Ensure dependencies are installed (requests)
    try:
        import requests
    except ImportError:
        print("Installing requests...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
        import requests

    run_verification()
