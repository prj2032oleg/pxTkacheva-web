function updateAboutContent(aboutData, locale) {
    const section = document.getElementById(aboutData.id);
    const colElements = section.querySelectorAll('.col-md-3');
    
    aboutData.content.forEach(item => {
      const element = document.getElementById(item.type);
      if (item.type === "about-img") {
        element.src = item.src;
        element.alt = item.alt;
      } else {
        element.innerHTML = item.text[locale];
      }
    });
    aboutData.columns.forEach((column, index) => {
      const col = colElements[index];
      col.innerHTML = '';
      column.elements.forEach(el => {
        let newElement = document.createElement(el.type);
        if (el.type === 'a') {
          newElement.href = el.href;
          el.class.forEach(className => {
            newElement.classList.add(className);
          });
          newElement.textContent = el.text;
        } else {
          newElement.innerHTML = el.text[locale];
        }
        col.appendChild(newElement);
      });
    })
};

function updateGalleryContent(galleryData, locale) {
  const section = document.getElementById(galleryData.id);
  document.getElementById(galleryData.content.type)
  .textContent = galleryData.content.text[locale];
  
  const galleryGrid = section.querySelector('.row.gallery-grid');
  galleryGrid.innerHTML = '';

  const createGalleryItem = (itemData) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 item';

    const link = document.createElement('a');
    link.className = 'lightbox';
    link.href = itemData.href;

    const img = document.createElement('img');
    img.className = 'img-responsive';
    img.src = itemData.href;
    img.alt = 'Image';

    const spanHover = document.createElement('span');
    spanHover.className = 'img-hover';

    link.appendChild(img);
    link.appendChild(spanHover);
    colDiv.appendChild(link);

    return colDiv;
  };

  galleryData.gallery.forEach(item => {
    const galleryItem = createGalleryItem(item);
    galleryGrid.appendChild(galleryItem);
  });
};

function updateTeamContent(teamData, locale) {
  const section = document.getElementById(teamData.id);
  document.getElementById(teamData.content.type)
  .textContent = teamData.content.text[locale];
  
  const container = section.querySelector('.container');
  const rows = section.querySelectorAll('.row.team');
  rows.forEach(row => {
    row.remove();
  });

  const createTeamCard = (team) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 col-sm-6';
  
    const teamWidget = document.createElement('div');
    teamWidget.className = 'team-wiget clearfix';
  
    const image = document.createElement('img');
    image.className = 'img-responsive';
    image.src = team.src;
    image.alt = team.title.de;
  
    const personalInfo = document.createElement('div');
    personalInfo.className = 'personal-info';
  
    const titleP = document.createElement('p');
    titleP.className = 'title';
    titleP.textContent = team.title[locale];
  
    const designationP = document.createElement('p');
    designationP.className = 'designation';
    designationP.textContent = team.designation[locale];
  
    personalInfo.appendChild(titleP);
    personalInfo.appendChild(designationP);
  
    if (team.href) {
      const vitaLink = document.createElement('h5');
      const link = document.createElement('a');
      link.href = team.href;
      link.target = '_blank';
      link.textContent = team.link || 'ZUR VITA';
      vitaLink.appendChild(link);
      personalInfo.appendChild(vitaLink);
    } else {
      const br = document.createElement('br');
      personalInfo.appendChild(br);
    }
  
    teamWidget.appendChild(image);
    teamWidget.appendChild(personalInfo);
    colDiv.appendChild(teamWidget);
  
    return colDiv;
  }

  let row = document.createElement('div');
  row.className = 'row team';

  teamData.teams.forEach((team, index) => {
    const teamCard = createTeamCard(team);
    row.appendChild(teamCard);

    if ((index + 1) % 3 === 0 || index === teamData.teams.length - 1) {
      container.appendChild(row);
      row = document.createElement('div');
      row.className = 'row team';
    }
  });
};

function updateLeistungContent(leistungData, locale) {
  const section = document.getElementById(leistungData.id);
  leistungData.content.forEach(item => {
    const element = document.getElementById(item.type);
    if (item.type === "leistung-img") {
      element.src = item.src;
      element.alt = item.alt;
    } else {
      element.innerHTML = item.text[locale];
    }
  });

  const accordionElement = section.querySelector('.panel-group');
  accordionElement.innerHTML = '';

  leistungData.accordion.forEach((item, index) => {
    const panelDefaultDiv = document.createElement('div');
    panelDefaultDiv.className = 'panel panel-default';

    const panelHeadingDiv = document.createElement('div');
    panelHeadingDiv.className = 'panel-heading';

    const panelTitleH4 = document.createElement('h4');
    panelTitleH4.className = 'panel-title font-alt';

    const toggleLink = document.createElement('a');
    toggleLink.dataset.toggle = 'collapse';
    toggleLink.dataset.parent = '#accordion';
    toggleLink.href = `#support${index + 1}`;
    toggleLink.textContent = item.question[locale];
    toggleLink.className = index === 0 ? '' : 'collapsed';

    const panelCollapseDiv = document.createElement('div');
    panelCollapseDiv.id = `support${index + 1}`;
    panelCollapseDiv.className = index === 0 ? 'panel-collapse collapse in' : 'panel-collapse collapse';

    const panelBodyDiv = document.createElement('div');
    panelBodyDiv.className = 'panel-body';
    panelBodyDiv.innerHTML = item.answer[locale];

    panelTitleH4.appendChild(toggleLink);
    panelHeadingDiv.appendChild(panelTitleH4);
    panelCollapseDiv.appendChild(panelBodyDiv);
    panelDefaultDiv.appendChild(panelHeadingDiv);
    panelDefaultDiv.appendChild(panelCollapseDiv);

    accordionElement.appendChild(panelDefaultDiv);
  });
};

function updateKontaktContent(kontaktData) {
  const section = document.getElementById(kontaktData.id);
  section.querySelector(kontaktData.content.type).src = kontaktData.content.src;
};

function updateAdresseContent(adresseData, locale) {
  const section = document.getElementById(adresseData.id);
  const row = section.querySelector('.row');
  row.innerHTML = '';

  const createAdresseColumn = (item) => {
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-3';
  
    const colCard = document.createElement('div');
    colCard.className = 'widgets-content';

    const title = document.createElement('h3');
    title.className = 'widgets-title';
    title.textContent = item.title[locale];

    const designation = document.createElement('p');
    if (typeof item.designation === 'object') {
      designation.innerHTML = item.designation[locale];
    } else if (typeof item.designation === 'string') {
      designation.innerHTML = item.designation;
    }
    
    colCard.appendChild(title);
    colCard.appendChild(designation);
    
    colDiv.appendChild(colCard);
  
    return colDiv;
  }
  
  adresseData.columns.forEach(item => {
    const adresseItem = createAdresseColumn(item);
    row.appendChild(adresseItem);
  });
};

function getUrlParameters() {
  return window.location.hash;
}

window.addEventListener('load', () => {
  let hash = getUrlParameters();
  
  switch (hash) {
    case '#freiburg':
      updateContent('freiburg', 'de');
      break;
    case '#hinterzarten':
      updateContent('hinterzarten', 'de');
      break;
    case '#freiburg-ru':
      updateContent('freiburg', 'ru');
      break;
    case '#hinterzarten-ru':
      updateContent('hinterzarten', 'ru');
      break;
    default:
      console.log('Not action for the Packages');
  }
});

function updateContent(type, locale) {
  const data = (type === 'hinterzarten' || type === 'hinterzarten-ru') ? Hinterzarten : Freiburg;
  if (!data) {
    console.error('Error: data not found');
    return;
  }

  try {
    updateAboutContent(data[0], locale);
    updateGalleryContent(data[1], locale);
    updateTeamContent(data[2], locale);
    updateLeistungContent(data[3], locale);
    updateKontaktContent(data[4]);
    updateAdresseContent(data[5], locale);
  } catch (error) {
    console.error('Error for refresh content:', error);
  }
};

function handleContent(type) {
  if (type !== 'denzlingen') {
    window.location.hash = type;
    location.reload();
  } else {
    history.pushState("", document.title, window.location.pathname + window.location.search);
    location.reload();
  }
};
