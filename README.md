**Project Name:** Healthepetz.com

**Project Team:** Bryan Hernandez, Amir Izadpanah, Chuck Nefkens, and Joel Vanderhoof

**Project Description:**

**Problem being addressed:** Costs of pet medical care

**Solution:** A portal for pet owners that provides tools for them to better manage their pets medical costs and care.

**Overview** : Healthepetz.com is an application pet owners can use to track and manager their pets&#39; medical data and gain access to information and solutions to help cost effectively optimize their pet&#39;s health. Core features for the initial release will include enabling owner&#39;s to create profiles for their pets and track their medical and vaccination history. Owners will be able to upload copies of medical bills and create electronic copies of their vet bills which will allow subscriber bill data to be aggregated for price comparison purposes. Pet vaccination history and due dates can be tracked so that reminder emails and text messages can be sent out to make sure owners stay up to date with their pet&#39;s vaccinations. Owners can give their vet access to their accounts to update medical history and vaccination info. There will be a vet locator feature to find local vets and a price comparison feature to enable owners to see how costs for specific procedures, lab tests and supplies compare against other subscribers located nearby. The application basic features are described in greater detail below. Aside from the basic features are optional features that will be included in the first release as time permits. Most likely, there won&#39;t be time for any additional features, but if there is, then the team will select optional items that can be completed before the project due date.

**Basic Features:**

1. User authentication and role based security
  1. User
    1. Email
    2. Password
    3. Role
  2. Delegate
    1. Delegate email
    2. Owner email
    3. Role
2. Profile for owner:
  1. FName
  2. LName
  3. Address
  4. City
  5. State
  6. Zip
  7. Phone
  8. Email
  9. Emergency Contact1 Name
  10. Emergency Contact1 Phone
  11. Emergency Contact2 Name
  12. Emergency Contract2 Phone
3. Profile for each pet with basic info i.e. :

- Pet Name
- Pet Picture
- Type
- Breed
- Color
- Age
- Health Conditions
- License Number
- Microchip Number
- Primary  Vet
- Specialists

1. Medical History (based on uploaded or entered vet bills)

1. Subscriber can key in detail from their vet bills to create an electronic vet bill record
  1. Invoice Number
  2. Date of Service From
  3. Date of Service To
  4. Provider Id
  5. Provider Name
  6. Diagnosis Code1 (if available)
  7. Diagnosis Code2
  8. Diagnosis Code3
  9. Procedure\Supply Code
  10. Procedure\Supply Description
  11. Billed Amt
  12. Paid Amt
  13. Discount Amt
  14. Claim Notes
2. Subscribers can upload copies of their vet bills
3. Grant vet access to account to upload medical information

1. Vaccination history tracking and email/text reminders
  1. Vaccination Desc
  2. Last Vaccination Date
  3. Provider Id
  4. Provider Name
  5. Next Vaccination Date
2. Vet locator
3. Price comparison (compare prices for same service within 10 miles of owners location

**Optional Features (As time permits):**

1. Microchip search API
2. Vet Chat Bot (Watson API) and/or
3. Vet Telemed Appts (via Skype)
4. OCR uploaded vet bills to automatically create electronic vet bill record
5. Vet Health Tips (rss feed)
6. Pet adoption Lookup/API
7. Pet Supply web crawler to
8. Supported by sponsors

**Potential Libraries and Packages:**

- Nodemailer (for email vaccination reminders)
- Passportjs (user authentication and role based security)
- Filestack (store uploaded copies of vet bills and medical info)
- Yelp API vet reviews (for vet locator feature)
- Vet Specialist lookup API (for vet locator feature)
- Text Magic API (for text vaccination reminders)
- Downloadable dictionary of veterinary diagnosis and procedure codes (for pet profile and vet medical/vaccination history tracking)

**Packages for optional items:**

- Node Receipt-scanner (OCR uploaded vet bills to scrape billing data and auto generate electronic vet bill record)
- IBM Watson API (for Vet Chat Bot)
- Google Calendar API (to schedule telemedicine appointments)
- Microchip Search API (lookup pet microchip number)

**GIT Repository:** https://github.com/amirizad/prj2\_healthepetz

**Heroku:** https://healthepetz.herokuapp.com/

**Trello:** https://trello.com/b/q1Otp9jx/bootcamp-group-project-2