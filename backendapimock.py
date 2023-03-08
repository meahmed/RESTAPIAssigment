from flask import Flask, jsonify,request
import random
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/forklifts', methods=['POST'])
def get_forklifts_data():
    data = request.get_json()
    start_date_str = data['start_date']
    end_date_str = data['end_date']
    start_date = datetime.fromisoformat(start_date_str)
    end_date = datetime.fromisoformat(end_date_str)+timedelta(days=1)
    forkliftData = {}
    forklift_id = random.randint(100, 999)
    dataArr=[]
    while start_date<end_date:
        date = start_date
        soc = round(random.uniform(0, 100), 1)
        max_temp = round(random.uniform(10, 55), 1)
        min_temp = round(random.uniform(10, max_temp), 1)
        max_amp_draw = round(random.uniform(-700, -50), 1)
        avg_amp_draw = round(random.uniform(-300, max_amp_draw), 1)
        dataArr.append({
            "date": date.isoformat(),
            "soc": soc,
            "maxTemp": max_temp,
            "minTemp": min_temp,
            "maxAmpDraw":    max_amp_draw,
            "avgAmpDraw": avg_amp_draw
        })
        start_date+= timedelta(minutes=30)
    forkliftData = {
        "forklift":forklift_id,
        "data":dataArr
    }
    return jsonify(forkliftData)


# Generate random data for batteries

@app.route('/api/batteries')
def batteries():
    data = {}
    for i in range(10):
        serial_number = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ', k=2)) + ''.join(random.choices('0123456789', k=5))
        status = random.choice(['Charging', 'Discharging', 'Idle'])
        ah_in = round(random.uniform(30, 2500), 1)
        ah_out = round(random.uniform(ah_in*0.95, ah_in*1.05), 1)
        temperature = round(random.uniform(10, 55), 1)
        data[str(i)] = {
            "facilityName": "Calgary",
            "serialNumber": serial_number,
            "status": status,
            "ahIn": ah_in,
            "ahOut": ah_out,
            "temperature": temperature
        }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
