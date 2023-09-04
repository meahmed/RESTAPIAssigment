# RESTAPIAssigment - Battery/Forklift Dashboard WebApp
#1234
## Description:

This is a simple dashboard web app that requests JSON data through a REST API backend. The backend API has been implemented using Flask in Python. It generates random data for forklifts and batteries, and exposes two API endpoints: ```/api/forklifts``` and ```/api/batteries```.
For the frontend, we have used a charting library called ChartJS and consumed the API via axios in order to Display the battery data and forklift data as line graph and table respectively.

The Forklift data is generated upon a **POST** request, the parameters of which are start_date and end_date. The forkliftData is generated as spaced 30 minutes apart.
### ForkliftData Example:
  ```
  {
    "forkliftId": 123,
    "data": [
    {
      "date": "2023-03-09T00:00:00Z",
      "soc": 16.2,
      "maxTemp": 21.1,
      "minTemp": 13.4,
      "maxAmpDraw": -334.8,
      "avgAmpDraw": -788.7
    },
    {
      "date": "2023-03-09T00:30:00Z",
      "soc": 25.2,
      "maxTemp": 25.3,
      "minTemp": 19.8,
      "maxAmpDraw": -255.7,
      "avgAmpDraw": -688.2
    }
  }
  ```
  
The BatteryData is generated by a **GET** request.
 ### BatteryData Example
 
 ```
 {
    "0": {
      "facilityName": "Calgary",
      "serialNumber": "EA6754",
      "status": "Charging",
      "ahIn": 1099.1,
      "ahOut": 1019.5,
      "temperature": 32.5
    },
    "1": {
      "facilityName": "Calgary",
      "serialNumber": "ME2431",
      "status": "Idle",
      "ahIn": 914.5,
      "ahOut": 939.7,
      "temperature": 22.5
    }
}
```

## Steps to run this Web App:
1. Download the files in your project directory.
2. Ensure you have python installed, then run the following command: ```pip install flask flask_cors``` (Windows)  ```pip3 install flask flask_cors``` (MacOS)
3. After this, navigate to your current directory and run the following command: ```python .\backendapimock.py```(Windows)  ```python3 .\backendapimock.py```(MacOS)
4. Once you see the Flask App is running, open the ```assignment.html``` file in your browser.
