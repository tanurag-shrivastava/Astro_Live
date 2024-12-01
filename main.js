  async function loadData() {
    try {
      const response = await fetch('./data.json');      const data = await response.json();

     
      document.querySelector('.display-2').innerHTML = data.title;
      document.querySelector('.lead').innerHTML = data.description;
      document.querySelector('.btn-primary').innerHTML = data.btnText;
      document.querySelector('.hero_img').src = data.imageSrc;
    } catch (error) {
      console.error("Error fetching the JSON data:", error);
    }
  }

  
  window.onload = loadData;

  async function loadAPODData() {
    try {
      const response = await fetch('./apod.json'); 
      const data = await response.json();

      // Populate the APOD section
      document.getElementById('title').innerHTML = data.title;
      document.getElementById('apod_info').innerHTML = data.description;
      document.getElementById('apod_img').src = data.imageSrc;
      document.getElementById('copyright').innerHTML = `© ${data.copyright}`;
      document.getElementById('date').innerHTML = data.date;
    } catch (error) {
      console.error("Error fetching the APOD JSON data:", error);
    }
  }

  
  window.onload = loadAPODData;

  