from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Mock data
papers = [
    {
        "id": 1,
        "title": "Long-term Outcomes of mRNA Vaccines in Oncology Patients",
        "authors": ["Smith J.", "Doe A.", "Wilson K."],
        "journal": "Nature Medicine",
        "year": "2024",
        "abstract": "This study investigates the efficacy and safety of mRNA-based therapeutic vaccines in patients undergoing treatment for solid tumors over a 24-month period...",
        "openAccess": True
    },
    {
        "id": 2,
        "title": "Artificial Intelligence in Early Detection of Pancreatic Cancer",
        "authors": ["Lee S.", "Chen H."],
        "journal": "The Lancet Digital Health",
        "year": "2023",
        "abstract": "We developed a deep learning algorithm trained on 50,000 CT scans to identify early-stage pancreatic lesions that are often missed by human radiologists...",
        "openAccess": False
    },
    {
        "id": 3,
        "title": "Gut Microbiome Diversity and Response to Immunotherapy",
        "authors": ["Garcia M.", "Brown L."],
        "journal": "Science",
        "year": "2025",
        "abstract": "Analysis of 200 patients revealed that specific bacterial taxa in the gut microbiome are strongly associated with clinical response to anti-PD-1 therapy...",
        "openAccess": True
    }
]

@app.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q', '').lower()
    years = request.args.get('years', '').split(',') if request.args.get('years') else []
    journals = request.args.get('journals', '').split(',') if request.args.get('journals') else []
    open_access = request.args.get('openAccess') == 'true'

    results = papers

    # Text Search
    if query:
        results = [
            p for p in results
            if query in p['title'].lower() or query in p['abstract'].lower()
        ]

    # Year Filter
    if years:
        results = [p for p in results if p['year'] in years]

    # Journal Filter
    if journals:
        results = [p for p in results if p['journal'] in journals]

    # Open Access Filter
    if open_access:
        results = [p for p in results if p['openAccess']]

    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
