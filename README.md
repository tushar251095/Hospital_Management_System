# Healthcare_Management

# Hospital Management System
Hospital Management System using Express.js,Node.js, React.js and MongoDB



## Prerequisites
1. Install Node 
2. Any Editor (Preferably VS Code)
3. Any web browser with latest version
4. MongoDB
5. Import collections in database

## Languages and Technologies used
1. HTML5/CSS
2. React.js (Front-End)
3. Bootstrap (An HTML, CSS, and JS library)
4. Express.js (Back-End)
5. React
6. MongoDB (Non-relational database)

## Steps to run the project in your machine
1. Clone or download the repository
2. Extract all the files
3. Open healthcare_management_client folder in vs Code and open the terminal to the path.
4. Run npm install to install all dependencies, then run npm start to run the project client.
5. Run npm install to install all dependencies, then run npm start to run the project server.
6. To setup database create database name HealthcareManagement.
7. Import all collections in  database folder.
8. Open browser and run http://localhost:8080/
9. Client is running on port 8080 and server is running on port 3000.
10. Hurray! That's it!
  

## GETTING INTO THE PROJECT:
This system has a ‘Home’ page from where the patient, doctor & administrator can login into their accounts.

![image](https://user-images.githubusercontent.com/36665975/66569676-ad2d8800-eb89-11e9-94e5-ea407622a1fe.png)

'About Us' page (Fig 1.2)  allows us to get some more information about the quality and the services of the hospital.

![image](https://user-images.githubusercontent.com/36665975/66569816-f4b41400-eb89-11e9-9377-d9ce53ded088.png)

‘Contact’ page allows users to provide feedback or queries about the services of the hospital. Fig 1.3 shows the ‘Contact’ page.

![image](https://user-images.githubusercontent.com/36665975/66569890-157c6980-eb8a-11e9-9b2f-c0e8a6ef702e.png)

The ‘Home’ page consists of 3 modules:
1. Patient Module
2. Doctor Module
3. Admin Module

### Patient Module:

  &nbsp; &nbsp; &nbsp; This module allows patients to create their account, book an appointment to see a doctor and see their appointment history.
  The registration page(in the home page itself) asks patients to enter their First Name, Last Name, Email ID, Contact Number, Password and dropdown to select their gender.
  
  ![image](https://user-images.githubusercontent.com/36665975/66570027-5b393200-eb8a-11e9-9e97-088630b5e583.png)

Once the patient has created his/her own account after clicking the ‘Register’ button, then he will be redirected to his/her Dashboard.

![image](https://user-images.githubusercontent.com/36665975/66570123-8c196700-eb8a-11e9-845f-ea02013f1d5c.png)

The Dashboard page allows patients to perform two operations:

**1. Book his/her appointment:**

  &nbsp; &nbsp; &nbsp; By clicking on book appointment patient can see the list of specalities avaliable in the hospital. After selecting specilaity he can select the doctor from the lis and then from appointment booking page he can select the time and date for the appointment.

![image](https://user-images.githubusercontent.com/36665975/66570202-c256e680-eb8a-11e9-8839-6c7fef68ac4c.png)

**2. View patients’ Appointment History:**

  &nbsp; &nbsp; &nbsp; Here, the patient can see their appointment history which contains Doctor Name, Appointment Date and Time and apointment Details(See Fig 1.8).
	
![image](https://user-images.githubusercontent.com/36665975/66570349-0ea22680-eb8b-11e9-94fe-22a86070a274.png)

Once the patient has logged out of his account, if he wants to go into his account again, he can login his account, instead of register his account again. Fig 1.9 shows the login page.
Clicking on ‘Login’ button will redirect the patient to his dashboard page which we have seen earlier (Fig 1.5)

![image](https://user-images.githubusercontent.com/36665975/66570502-588b0c80-eb8b-11e9-88e3-5294ae896ace.png)

This is how the patient module works. On the whole, this module allows patients to register their account or login their account(if he/she has one), book an appointment and view his/her appointment history.

### Doctor Module:

  &nbsp; &nbsp; &nbsp; The doctors can login into their account. Registration of a doctor account can be done only by admin doctor will get the email of his/her password. We will discuss more about this in Admin Module.
  
![image](https://user-images.githubusercontent.com/36665975/66570609-8bcd9b80-eb8b-11e9-8099-9f285aa7fe0f.png)

Once the doctor clicking the ‘Login’ button, they will be redirected to their own dashboard.

![image](https://user-images.githubusercontent.com/36665975/66570642-a0119880-eb8b-11e9-8d23-be898e1bfa29.png)

In this page, he can see different cards which are the functinality that doctor can perform.


![image](https://user-images.githubusercontent.com/36665975/66570704-be779400-eb8b-11e9-92ae-21d8e0e4aba4.png)

**1. Manage his/her appointment:**
    &nbsp; &nbsp; &nbsp; When doctor click on manage appointment card he will be redirected to manage appointment page where he can add.edit his appointment schedule as required by submitting the required details.

    ![image](https://user-images.githubusercontent.com/36665975/66570704-be779400-eb8b-11e9-92ae-21d8e0e4aba4.png)

**2. View Appointments:**
 &nbsp; &nbsp; &nbsp; Doctor can view his current, cancelled and attented appointment by clicking on this card. Where he can attend the appointment and can prescribe medicine to patient as well can send admit request to admin if patient is required to get admitted.
    
    ![image](https://user-images.githubusercontent.com/36665975/66570704-be779400-eb8b-11e9-92ae-21d8e0e4aba4.png)

 **3. Search Patient:**
     &nbsp; &nbsp; &nbsp;
     When clicked on search button in nav bar doctor is redirected to the search patient page where he can search paticular patient using patient first/last name and can view his all medical history.
    ![image](https://user-images.githubusercontent.com/36665975/66570704-be779400-eb8b-11e9-92ae-21d8e0e4aba4.png)

 **4. View admit patients:**
     &nbsp; &nbsp; &nbsp;
     When clicked on search button in nav bar doctor is redirected to the search patient page where he can search paticular patient using patient first/last name and can view his all medical history.

    ![image](https://user-images.githubusercontent.com/36665975/66570704-be779400-eb8b-11e9-92ae-21d8e0e4aba4.png)

 **4. View Facility Details:**
     &nbsp; &nbsp; &nbsp;
     Doctor can view list of facility details in hospital.
     
    ![image](https://user-images.githubusercontent.com/36665975/66570704-be779400-eb8b-11e9-92ae-21d8e0e4aba4.png)

**5. Cancel Appointments**
	
   &nbsp; &nbsp; &nbsp; Patients and doctors can able to delete their appointments.
   When doctor or patient sees list of their current appointment they can see cancel button in front of ecah appointment. They can cancel the appointment from their. Once appointment is cancelled the same time slot is vailable again to book for other patient.
![image](https://user-images.githubusercontent.com/36665975/66570841-03032f80-eb8c-11e9-9cfc-62b6b869c918.png)
&nbsp; &nbsp; &nbsp; Once everything is done, the doctor can logout of their account. Thus, in general, a doctor can login into his/her account, view their appointments and search for a patient. This is all about Doctor Module.

### Admin Module:
   
   &nbsp; &nbsp; &nbsp; This module is the heart of our project where an admin can see the list of all patients and doctors.
  &nbsp; &nbsp; &nbsp; `username`: admin@gmail.com, `password`: admin

On clicking the ‘Login’ button, the admin will be redirected to his/her dashboard

![image](https://user-images.githubusercontent.com/36665975/66570841-03032f80-eb8c-11e9-9cfc-62b6b869c918.png)


**1. View the list of all patients registered:**

  &nbsp; &nbsp; &nbsp; Admin can able to view all the patients registered. This includes the patients’ First Name, Last Name, Email ID, Contact Number. 
  
  ![image](https://user-images.githubusercontent.com/36665975/66571179-83c22b80-eb8c-11e9-8819-008cdd2b0c2e.png)
  
**2. View the list of all doctors registered:**

  &nbsp; &nbsp; &nbsp; Details of the doctors can also be viewed by the admin. This details include the Name of the doctor, Email etc.

![image](https://user-images.githubusercontent.com/36665975/66571329-a5bbae00-eb8c-11e9-89be-ce1a9c73e01b.png)
  
**3. Add Doctor:**

  &nbsp; &nbsp; &nbsp; Admin alone can add a new doctor since anyone can register as a doctor if we put this section on the home page. This form asks Doctor’s Name, Email ID, and some details related to doctor once submitted doctor get the email of his/her password.
  
  ![image](https://user-images.githubusercontent.com/36665975/66571687-55911b80-eb8d-11e9-9859-54e15d4ad8a0.png)
  
  After adding a new doctor, if we check the doctor’s list, we will see the details of new doctor is added to the list.
  
**4. Add/update facility details:**

  &nbsp; &nbsp; &nbsp; Admin can add new facility included in hospital. He can also edit the facility details like status of facility, count etc.
  
  ![image](https://user-images.githubusercontent.com/36665975/66571573-27134080-eb8d-11e9-8c1f-191a9f491872.png)
  
  &nbsp; &nbsp; &nbsp; Taking everything into consideration, admin can able to view the details of patients and doctors, Admit details, Add/edit facility details and can add a new doctor. Once everything is done, the admin can logout from his account.
  
**5. Remove Doctors by Admin:**

&nbsp; &nbsp; &nbsp; Admin can also delete the doctors from the system. This let admin to have more control over the system.

![image](https://user-images.githubusercontent.com/36665975/75170650-6d3dfa80-5750-11ea-8f05-455c7d704217.png)
  



