import requests
import json

BASE_URL = 'http://localhost:5000/api'

def test_create_report():
    data = {
        "report_id": "DR001",
        "rig_name": "Test Rig 1",
        "well_name": "Test Well A",
        "current_depth": 1000.5,
        "tvd": 950.3
    }
    
    response = requests.post(f'{BASE_URL}/reports', json=data)
    print("Create Report Response:", response.status_code)
    print(json.dumps(response.json(), indent=2))

def test_get_reports():
    response = requests.get(f'{BASE_URL}/reports')
    print("\nGet Reports Response:", response.status_code)
    print(json.dumps(response.json(), indent=2))

if __name__ == '__main__':
    print("Testing API endpoints...")
    test_create_report()
    test_get_reports()
