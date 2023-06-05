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

## steps to run using docker:
1. Go to yaml file directory and run docker-compose up -d --build
2. All the containers will start after this command and client will be running on port 8080 
   and server on 3000.
3. To setup database connect your mongoDB compass with mongo db container  using connecting 
   string mongodb://<<IP address>>:27017, then in test db import all the collections from database folder.
4. Hurray! Project is ready to explore.

## GETTING INTO THE PROJECT:
This system has a ‘Home’ page from where the user can see what services system provide. 
Header bar provide login option for all the roles and sigup option for patient.


![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/homePage%20(2).png?raw=true)


![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/loginPage.png?raw=true)


The application consists of 3 modules:
1. Patient Module
2. Doctor Module
3. Admin Module

### Patient Module:

  &nbsp; &nbsp; &nbsp; This module allows patients to create their account, book an appointment to see a doctor and see their appointment history.
  The registration page asks patients to enter their First Name, Last Name, Email ID, Contact Number, Password and dropdown to select their gender.
  
![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/PatientRegistrationPage.png?raw=true)


Once the patient has created his/her own account after clicking the ‘Register’ button, then his account will be created. Once patient login he will be redirected to the patient dashboard.

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/patientDashBoard.png?raw=true)

The Dashboard page allows patients to perform two operations:

**1. Book his/her appointment:**

  &nbsp; &nbsp; &nbsp; By clicking on book appointment patient can see the list of specalities avaliable in the hospital. After selecting specilaity he can select the doctor from the lis and then from appointment booking page he can select the time and date for the appointment.

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/specialityList.png?raw=true)

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/bookAppointmentDoctorList.png?raw=true)

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/bookAppointmnetForm.png?raw=true)

**2. View patients’ Appointment History:**

  &nbsp; &nbsp; &nbsp; Here, the patient can see their appointment history which contains Doctor Name, Appointment Date and Time and apointment Details.
	
![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/patientMedicalHistory.png?raw=true)

Once the patient has logged out of his account, if he wants to go into his account again, he can login his account, instead of register his account again.
Clicking on ‘Login’ button will redirect the patient to his dashboard page which we have seen earlier.

This is how the patient module works. On the whole, this module allows patients to register their account or login their account(if he/she has one), book an appointment and view his/her appointment history.

### Doctor Module:

  &nbsp; &nbsp; &nbsp; The doctors can login into their account. Registration of a doctor account can be done only by admin doctor will get the email of his/her password. We will discuss more about this in Admin Module.

Once the doctor click the ‘Login’ button, they will be redirected to their own dashboard.

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/doctorDashboard.png?raw=true)

In this page, he can see different cards which are the functinality that doctor can perform.

**1. Manage his/her appointment:**
    &nbsp; &nbsp; &nbsp; When doctor click on manage appointment card he will be redirected to manage appointment page where he can add.edit his appointment schedule as required by submitting the required details.
    ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/doctorManageSchedulePage.png?raw=true)

**2. View Appointments:**
 &nbsp; &nbsp; &nbsp; Doctor can view his current, cancelled and attented appointment by clicking on this card. Where he can attend the appointment and can prescribe medicine to patient as well can send admit request to admin if patient is required to get admitted.
    ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/DocotorAppointmentList.png?raw=true)

 **3. Search Patient:**
     &nbsp; &nbsp; &nbsp;
     When clicked on search button in nav bar doctor is redirected to the search patient page where he can search paticular patient using patient first/last name and can view his all medical history.
    ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/searchPatient.png?raw=true)

 **4. View admit patients:**
     &nbsp; &nbsp; &nbsp;
     When clicked on search button in nav bar doctor is redirected to the search patient page where he can search paticular patient using patient first/last name and can view his all medical history.
    ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/doctorAdmittedpatient.png?raw=true)

 **4. View Facility Details:**
     &nbsp; &nbsp; &nbsp;
     Doctor can view list of facility details in hospital.
    ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/doctorFacilityList.png?raw=true)

**5. Cancel Appointments**
	
   &nbsp; &nbsp; &nbsp; Patients and doctors can able to delete their appointments.
   When doctor or patient sees list of their current appointment they can see cancel button in front of ecah appointment. They can cancel the appointment from their. Once appointment is cancelled the same time slot is vailable again to book for other patient.
![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/DocotorAppointmentList.png?raw=true)
&nbsp; &nbsp; &nbsp; Once everything is done, the doctor can logout of their account. Thus, in general, a doctor can login into his/her account, view their appointments and search for a patient. This is all about Doctor Module.

### Admin Module:
   
   &nbsp; &nbsp; &nbsp; This module is the heart of our project where an admin can see the list of all patients and doctors.
  &nbsp; &nbsp; &nbsp; `username`: admin@gmail.com, `password`: admin

On clicking the ‘Login’ button, the admin will be redirected to his/her dashboard

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/adminDashboard.png?raw=true)


**1. View the list of all patients registered:**

  &nbsp; &nbsp; &nbsp; Admin can able to view all the patients registered. This includes the patients’ First Name, Last Name, Email ID, Contact Number. 
  
  ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/patientList.png?raw=true)
  
**2. View the list of all doctors registered:**

  &nbsp; &nbsp; &nbsp; Details of the doctors can also be viewed by the admin. This details include the Name of the doctor, Email etc.

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/doctorsList.png?raw=true)
  
**3. Add Doctor:**

  &nbsp; &nbsp; &nbsp; Admin alone can add a new doctor since anyone can register as a doctor if we put this section on the home page. This form asks Doctor’s Name, Email ID, and some details related to doctor once submitted doctor get the email of his/her password.
  
  ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/addDoctorPage.png?raw=true)
  
  After adding a new doctor, if we check the doctor’s list, we will see the details of new doctor is added to the list.
  
**4. Add/update facility details:**

  &nbsp; &nbsp; &nbsp; Admin can add new facility included in hospital. He can also edit the facility details like status of facility, count etc.
  
  ![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/adminFacilityManagementPage.png?raw=true)
  
  &nbsp; &nbsp; &nbsp; Taking everything into consideration, admin can able to view the details of patients and doctors, Admit details, Add/edit facility details and can add a new doctor. Once everything is done, the admin can logout from his account.
  
**5. Remove Doctors by Admin:**

&nbsp; &nbsp; &nbsp; Admin can also delete the doctors from the system. This let admin to have more control over the system.

![image](https://github.com/tushar251095/Hospital_Management_System/blob/main/ProjectScreenshots/deleteDoctor.png?raw=true)



