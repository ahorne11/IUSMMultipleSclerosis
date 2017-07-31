//changes nav menus based on screen size 
if (matchMedia) {
    var mq = window.matchMedia("(max-width: 923px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

// media query change
function WidthChange(mq) {
    //get elements
    var expertiseHome = document.getElementById("expertise-home");
    var educationInformation = document.getElementById("education-information");
    var researchAbout = document.getElementById("research-about");
    var careResearch = document.getElementById("care-research");
    var departmentsStaff = document.getElementById("departments-staff");
    var newsNews = document.getElementById("news-news");
    var aboutContact = document.getElementById("about-contact");

    var checkForMobile = document.getElementById("checkForMobile");

    if (mq.matches) {
        //change for mobile
        expertiseHome.setAttribute('href', "home.html");
        expertiseHome.innerHTML = "MS Home";

        educationInformation.setAttribute('href', "info.html");
        educationInformation.innerHTML = "Information";

        researchAbout.setAttribute('href', "about.html");
        researchAbout.innerHTML = "About Us";

        careResearch.setAttribute('href', "research.html");
        careResearch.innerHTML = "Research";
        
        departmentsStaff.setAttribute('href', "staff.html");
        departmentsStaff.innerHTML = "Our Staff";

        newsNews.setAttribute('href', "news.html");
        newsNews.innerHTML = "News";

        aboutContact.setAttribute('href', "contact.html");
        aboutContact.innerHTML = "Contact Us";

        checkForMobile.innerHTML = "True";
    } else {
        //put things back to normal
        expertiseHome.setAttribute('href', "https://medicine.iu.edu/expertise/");
        expertiseHome.innerHTML = "Expertise";

        educationInformation.setAttribute('href', "https://medicine.iu.edu/education/");
        educationInformation.innerHTML = "Education";

        researchAbout.setAttribute('href', "https://medicine.iu.edu/research/");
        researchAbout.innerHTML = "Research";

        careResearch.setAttribute('href', "https://medicine.iu.edu/clinical-care/");
        careResearch.innerHTML = "Clinical Care";

        departmentsStaff.setAttribute('href', "https://medicine.iu.edu/departments/");
        departmentsStaff.innerHTML = "Departments";

        newsNews.setAttribute('href', "https://medicine.iu.edu/news/");
        newsNews.innerHTML = "News";
        
        aboutContact.setAttribute('href', "https://medicine.iu.edu/about/");
        aboutContact.innerHTML = "About";

        checkForMobile.innerHTML = "False";
    }
    console.log(checkForMobile.innerHTML)
}