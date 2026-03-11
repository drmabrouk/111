import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_search_endpoint(client):
    rv = client.get('/api/search?q=oncology')
    json_data = rv.get_json()
    assert rv.status_code == 200
    assert len(json_data) > 0
    assert "Oncology" in json_data[0]['title']

def test_search_empty_query(client):
    rv = client.get('/api/search')
    json_data = rv.get_json()
    assert rv.status_code == 200
    assert len(json_data) == 3

def test_year_filter(client):
    rv = client.get('/api/search?years=2024')
    json_data = rv.get_json()
    assert len(json_data) == 1
    assert json_data[0]['year'] == '2024'

def test_journal_filter(client):
    rv = client.get('/api/search?journals=Science')
    json_data = rv.get_json()
    assert len(json_data) == 1
    assert json_data[0]['journal'] == 'Science'

def test_open_access_filter(client):
    rv = client.get('/api/search?openAccess=true')
    json_data = rv.get_json()
    # In mock data, 2 papers are openAccess
    assert len(json_data) == 2
    for p in json_data:
        assert p['openAccess'] is True

def test_combined_filters(client):
    rv = client.get('/api/search?q=immunotherapy&openAccess=true&years=2025')
    json_data = rv.get_json()
    assert len(json_data) == 1
    assert "Immunotherapy" in json_data[0]['title']
    assert json_data[0]['year'] == '2025'
