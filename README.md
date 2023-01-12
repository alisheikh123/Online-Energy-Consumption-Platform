#  DS2022_30642_Varga_Alexandra_Assignment_1
Conceptual architecture of the online platform.

The main purpose to build this Application to :
 Calculate the energy consumption against any user's device according to the respective Date.
 
 Architecture:
    Roles: Two Role is this App
     1) Admin
     2) Client
     
   Responsibilty:
   
     Admin: 
             - To Create,Read,Delete,Update the User
             - To Create,Read,Delete,Update the Devices
             - Assign the Devices to Particullar User
             - Add Daily Energy Consumptions against every user devices
             - Assign the Role to particular user
             
     Client:
            - Can we their devices which admin assigned
            - check daily consumption in Barchart by selecting device and Date
            
   
   
   How to Run the Project:
   
                          Our Application Consist of two parts 
                             1) Frontend [ Developed in Angular]
                             2) Backend [ Developed in .NET Core Web APIs]


          Frontend:
                  1) Clone the Application By Coping the Url
                  2) Go to 'Frontend' Directory and open it in VS CODE
                  3) Write Command  'npm i --force' in command prompt ( it will install all require packages)
                  4) Run 'ng s' in command prompt
                  
          Backend:
                 
                  1) Open the 'Backend' Project in Visual studio
                  2) Goto 'Appsettings.json' and change the Data Source and Database name as you created in your Local SQL Server
                  3) Go Sql Server and open the datavase then go to ASPNETROLE Table and Edit it after that add new Role Admin ,Client
                  4) Then Run the App and put admin username and admin password then you will redirect to your Account of admin
                  5) After that you can create users and device and perform every task as define in portal
                
 
