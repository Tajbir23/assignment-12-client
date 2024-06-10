# **HealthDx**

Welcome to **HealthDx**, your comprehensive solution for managing medical appointments, test results, and user profiles with ease. This platform includes both user and admin functionalities to ensure smooth and efficient healthcare service management.

## Live Site URL
[HealthDx](https://assignment12.tajbirideas.com/)

## Admin Credentials
- **Username**: admin@healthdx.com
- **Password**: Admin123!

## Features

1. **User Authentication and Profile Management**:
   - Secure email/password login using Firebase Authentication.
   - User registration with fields for email, name, avatar, blood group, district, upazila, password, and confirm password.
   - Default user status is set to "active". Admins can change the status to "blocked".

2. **User Dashboard (Private)**:
   - **My Profile**: View and edit personal profile details.
   - **My Upcoming Appointments**: View and cancel upcoming appointments.
   - **Test Results**: Access, download, and print test results.

3. **Homepage**:
   - Dynamic navbar showing routes based on login status (user or admin).
   - Dynamic banner displaying admin-selected content.
   - Display of featured tests and promotional information.
   - Personalized recommendations including health tips and preventive measures.

4. **All Tests Page**:
   - Display all available tests with details such as image, date, slots, title, and short description.
   - Filter tests by date.
   - Search functionality.

5. **Test Details Page**:
   - View detailed information about a test.
   - Book tests if slots are available, with a booking system reducing available slots by one.
   - Payment integration using Stripe, including coupon code discounts.

6. **Admin Dashboard**:
   - **All Users**: View, download user details in PDF, change user status (active/blocked), and assign admin roles.
   - **Add a Test**: Admin can add new tests with fields for name, image URL, details, price, date, and slots.
   - **All Tests**: Display, update, and delete test data in a table format.
   - **Reservations**: View, search, and manage user reservations. Submit test results.
   - **Add Banner**: Admin can add banner details including name, image, title, description, coupon code, and active status.
   - **All Banners**: Manage all banners and select one active banner to display.
   - **Statistics**: Charts displaying the most booked services and service delivery ratios (pending/completed).

7. **Advanced Features**:
   - **Pagination**: Implemented in the "All Tests" page for efficient data handling.
   - **JWT Authentication**: Using local storage for secure access, with error handling for unauthorized access (401, 403 errors).
   - **TanStack Query**: Used for all data fetching (GET methods) to optimize performance.

## Additional Pages

1. **About Us**: Detailed information about the HealthDx, mission, and team.
2. **Contact Us**: Contact information and a form for users to reach out with queries or feedback.
3. **FAQ**: Frequently asked questions with detailed answers to help users navigate the platform.

## Installation and Setup


