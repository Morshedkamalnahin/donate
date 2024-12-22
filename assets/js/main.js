$(function () {
    // JS function for items section hover effect===============
    $(".item").hover(function () {
        $('#active-hover').css({ "box-shadow": "none", "background-color": "#F0FFF0" });
    }, function () {
        $('#active-hover').css({ "box-shadow": "0px 0px 20px lightgrey", "background-color": "#FFF" });
    });


    // navbar topfix=====================
    var navOffset = $('#nav').offset().top;
    $(window).on('scroll', function () {
        var winOffset = $(window).scrollTop();
        if (winOffset > navOffset) {
            $('#nav').addClass('navfix');
            $('#nav').slideDown(slow)
        } else {
            $('#nav').removeClass('navfix');
        }
    });// navbar fixed class close

    // smoth scrolling from navigation menu
    $('nav a').on('click', function (e) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash; //store value
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                window.location.hash = hash;
            });
        }
    });//smoth scrolling close

    //scrolling to top by click bottom button==================
    $('.top-scroll').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });//bottom button close

    // //Pre loading================================
    $(window).on('load', function () {
        $('.pre-loader').delay(1000).fadeOut(1000);
    });//Pre loader close

    //password hide & show
    function Hide() {
        var x = document.getElementById("password");
        var y = document.getElementById("hidden");
        if (x.type === "password") {
            x.type = "text";
            y.innerHTML = "Hide";
        } else {
            x.type = "password";
            y.innerHTML = "Show";

        }
    }

})//html,body connect function close

document.addEventListener("DOMContentLoaded", () => {
    fetch("./assets/donor.json")
      .then((response) => response.json())
      .then((data) => {
        populateDonors(data.donors);
        populateBloodBanks(data.bloodBanks);
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  
  function populateDonors(donors) {
    const donorList = document.querySelector(".contact-list");
    donorList.innerHTML = ""; // Clear existing content
    donors.forEach((donor) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `<span class="contact-name">${donor.name}</span><span>${donor.phone}</span> <span>${donor.bloodgroup}</span>`;
      donorList.appendChild(listItem);
    });
  }
  
  function populateBloodBanks(bloodBanks) {
    const bloodBanksContainer = document.querySelector("#blood-banks .row");
    bloodBanksContainer.innerHTML = ""; // Clear existing content
    bloodBanks.forEach((bank, index) => {
      const card = document.createElement("div");
      card.classList.add("col-md-12");
      card.innerHTML = `
        <div class="donor-card">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="fw-bold">${bank.name}</h5>
              <p class="mb-1">${bank.bloodgroup}</p>
              <p class="mt-3">Contact Number: ${bank.phone}</p>
            </div>
            <button class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#locationModal" data-index="${index}">View Location</button>
          </div>
        </div>`;
      bloodBanksContainer.appendChild(card);
    });
  
    // Add event listener to each "View Location" button
    const viewLocationButtons = document.querySelectorAll(".btn-dark[data-bs-toggle='modal']");
    viewLocationButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        const bank = bloodBanks[index];
        updateLocationModal(bank);
      });
    });
  }
  
  function updateLocationModal(bank) {
    const modalTitle = document.querySelector("#locationModal .modal-title");
    const modalBody = document.querySelector("#locationModal .modal-body");
  
    modalTitle.textContent = `${bank.name}`;
    modalBody.innerHTML = `
      <p><strong>Address:</strong> ${bank.address}</p>
      <p><strong>Contact Number:</strong> ${bank.phone}</p>
      <p><strong>last Donate:</strong> ${bank.donatelast}</p>
    `;
  }