from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.alert import Alert
from selenium.common.exceptions import NoAlertPresentException
import time
# driver=None
test_data = [
    {
        "id": 1,
        "scenario": "Login Test - Valid User",
        "email": "muthuabi@gmail.com",
        "password": "Muthu123",
        "result": "Pending",
        "expected": "Credentials Validated",
        "output": ""
    },
    {
        "id": 2,
        "scenario": "Login Test - Invalid Password",
        "email": "krish@gmail.com",
        "password": "WrongPass",
        "result": "Pending",
        "expected": "Invalid Password",  
        "output": ""
    },
    {
        "id": 3,
        "scenario": "Login Test - Forced Failure",
        "email": "krishraj@gmail.com",
        "password": "WrongPass",
        "result": "Pending",
        "expected": "User Not Found",  
        "output": ""
    }
]

try:
    driver=webdriver.Chrome()
    driver.get("file:///home/muthukeerthana/Code-Space/se-testing/login.html")
    def login_test(data):
        print(f"Test Case-{data["id"]} Processing...")
        input_email=driver.find_element(By.NAME,"email")
        input_pass=driver.find_element(By.NAME,"password")
        btn_submit=driver.find_element(By.CSS_SELECTOR,"[type='submit']")
        input_email.clear()
        input_pass.clear()
        time.sleep(1)
        input_email.send_keys(data["email"])
        input_pass.send_keys(data["password"])
        time.sleep(1)
        btn_submit.click()
        # time.sleep(1)
        try:
            print("Processing to Alert Segment")
            alert=Alert(driver)
            alert_text=alert.text
            time.sleep(2)
            alert.accept()
            data["output"]=alert_text
            if(alert_text==data["expected"]):
                data["result"]="Success"
            else:
                data["result"]="Failed"
        except NoAlertPresentException:
            print("Test Case Failed")
            data["output"]="No Alert"
            data["result"]="Failed"
        finally:
            print(f"Login Test Call-{data["id"]} Completed")
    time.sleep(1)
    for test in test_data:
        login_test(test)
        time.sleep(1)
    # time.sleep(1)
    driver.quit()
except Exception as e:
    print("Exception Occured",e)
finally:
     for test in test_data:
         print(test)
    #  print(test_data)
    #  driver.quit()
