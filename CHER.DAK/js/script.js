/// CHAIRS DATABASE   [USING JSON SOON]
const chairsList = {
    
    names:
    [
        'RALF',
        'LUNA',
        'COMPAS',
        'DRUF'
    ],
    
    descriptions:
    [
        'Материал корпуса: Дуб.<br> Материал сидения: Эко-кожа или Рогожка.',
        'Материал корпуса: Дуб.<br> Материал сидения: Эко-кожа или Рогожка.',
        'Материал корпуса: Дуб.<br> Материал сидения: Эко-кожа или Рогожка.',
        'Материал корпуса: Дуб.<br> Материал сидения: Эко-кожа или Рогожка.'
    ],
    
    options:
    {
        widths:
        [
            64, 
            52, 
            55, 
            50
        ],
        depths:
        [
            51, 
            45, 
            48, 
            54
        ],
        heights:
        [
            74, 
            75, 
            74, 
            75
        ],
        colors:
        [
            ['#986a49', '#a19ca1'],
            ['#e0c8b2', '#e3ceba'],
            ['#c7ac9f', '#cd9f55'],
            ['#c38751', '#333436'],
        ]
    },
    
    urls:
    {
        png:
        [
            './imgs/catalog/png/compas.png',
            './imgs/catalog/png/druf.png',
            './imgs/catalog/png/luna.png',
            './imgs/catalog/png/ralf.png'
        ],

        real:
        [
            './imgs/catalog/real/compas.jpg',
            './imgs/catalog/real/druf.png',
            './imgs/catalog/real/luna.jpg',
            './imgs/catalog/real/ralf.jpg'
        ]
    }
}
/// ADD A CHAIR EASILY [USING API SOON, FOR SALAVAT]
const addChair = (name, description, [...options], urls) => {
    chairsList.names.push(name);
    chairsList.descriptions.push(description);
    
    chairsList.options.widths.push(options[0]);
    chairsList.options.depths.push(options[1]);
    chairsList.options.heights.push(options[2]);
    
    chairsList.urls.png.push(urls.png);
    chairsList.urls.real.push(urls.real);
}

/// ASSIGN THE CHAIR INFOS TO HTML NODES
const assignToNodes = (i = 0,
    name = chairsList.names[i], 
    description = chairsList.descriptions[i], 
    [...options] = [chairsList.options.widths[i], chairsList.options.depths[i], chairsList.options.heights[i], chairsList.options.colors[i][0], chairsList.options.colors[i][1]],
    url = chairsList.urls.real[i]) => 
    {
        document.querySelector('#catalog #name').innerText = name;
        document.querySelector('#catalog #description').innerHTML = description;
        
        document.querySelector('#dimentions #width').innerText = options[0];
        document.querySelector('#dimentions #depth').innerText = options[1];
        document.querySelector('#dimentions #height').innerText = options[2];
        document.querySelector('#color').style.backgroundColor = options[3];
        document.querySelector('#color2').style.backgroundColor = options[4];
        
        document.querySelector('#catalog .image').style.backgroundImage = `url(${url})`;
}

/// ADD ICONS IN SLIDEBAR
const addIcons = () => {
    const viewDiv = document.querySelector('.views');
    chairsList.urls.png.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        viewDiv.appendChild(img);
    })
}

/// SOME ANIMATIONS
const offers = document.querySelectorAll('#offers > *');
const testimonials = document.querySelectorAll('#testimonials > *');
const features = document.querySelectorAll('#features > *');
const catalog = document.querySelectorAll('#catalog > *');
const cta = document.querySelectorAll('#CTA > *');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting)
            entry.target.classList.add('animated');
    });
},
{
    rootMargin: '100px'
});

offers.forEach(el => observer.observe(el));
testimonials.forEach(el => observer.observe(el));
features.forEach(el => observer.observe(el));
catalog.forEach(el => observer.observe(el));
cta.forEach(el => observer.observe(el));


/// ON LOAD
window.onload = () => {
    addIcons();             // ADD ICONS TO THE SLIDES BAR
    assignToNodes();        // ASSIGN DATABASE TO NODES
    
    /* ADD CLASS ACTIVE TO THE CURRENT ICON */
    const slide_pics = document.querySelectorAll('#catalog .views img');
    slide_pics[0].classList.add('active');
    
    /* ADD EVENT LISTENER TO ALL ICONS */
    i = 0;      /// SLIDER COUNTER
    slide_pics.forEach(img => 
        img.addEventListener('click', () => {
            slide_pics.forEach(img => img.classList.remove('active'));
            assignToNodes(i = Object.values(slide_pics).indexOf(img));
            img.classList.add('active');
            
            i++;
            if(i == chairsList.names.length) i=0;

        })
    ); i++;
}