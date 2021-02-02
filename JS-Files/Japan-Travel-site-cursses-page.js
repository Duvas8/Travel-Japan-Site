const cards = document.querySelectorAll(".card");

const mapInfo = [
	{curessTitle : "Big City",
	mapLat : 51.505,
	mapLon : 0,
	},
	{curessTitle : "Food",
	mapLat : 51.505,
	mapLon : 0,
	},
	{curessTitle : "Nature",
	mapLat : 51.505,
	mapLon : 0,
	},
	{curessTitle : "Culture",
	mapLat : 51.505,
	mapLon : 0,
	},
	{curessTitle : "Pepole",
	mapLat : 51.505,
	mapLon : 0,
	},

];
		
		const toggleExpansion = (element, to, duration = 350) => {
		  return new Promise((res) => {
		    element.animate([
		      {
			top: to.top,
			left: to.left,
			width: to.width,
			height: to.height
		      }
		    ], {duration, fill: 'forwards', ease: 'ease-in'})
		    setTimeout(res, duration);
		  })
		}

		const fadeContent = (element, opacity, duration = 300) => {
			return new Promise(res => {
				[...element.children].forEach((child) => {
					requestAnimationFrame(() => {
						child.style.transition = `opacity ${duration}ms linear`;
						child.style.opacity = opacity;
					});
				})
				setTimeout(res, duration);
			})
		}

		//maybe needs pormis and await
		const createMap = (cardDataIndex) => {
			const cardContentDiv = document.querySelector(".card-content");
			const creatMapDiv = document.createElement("div");
			creatMapDiv.id = "mapid";
			cardContentDiv,appendChild(creatMapDiv);
			
			const mymap = L.map('mapid').setView([mapInfo[cardDataIndex].mapLat, mapInfo[cardDataIndex].mapLon], 13);

			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	 }).addTo(mymap);
		};


		const getCardContent = (title, mapLat, mapLon) => {
			return `
            <div class="card-content">
            <h2>The ${title}</h2>

            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
             Dolorum voluptates sequi modi at voluptatibus.
              Tempora iste laudantium nemo sequi soluta nobis aut ex molestias quos,
               dicta, quas est iure odio?</p>
             
        </div>
        <div class="card-content">
            <h2>the routs</h2>
			 <div id="mapid">
			 </div>
			 <script>
			 const mymap = L.map('mapid').setView([${mapLat}, ${mapLon}], 13);

			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		 attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	 }).addTo(mymap);
		};
			 </script>

           </div>
        </div>
			`;
		}

		const onCardClick = async (e) => {
            const card = e.currentTarget;
			const cardDataIndex = e.currentTarget.dataset.index;
			const mapLat = mapInfo[cardDataIndex].mapLat;
			const mapLon = mapInfo[cardDataIndex].mapLon;
			
	
			// clone the card
			const cardClone = card.cloneNode(false);
			// get the location of the card in the view
			const {top, left, width, height} = card.getBoundingClientRect();
			// position the clone on top of the original
			cardClone.style.position = 'fixed';
			cardClone.style.top = top + 'px';
			cardClone.style.left = left + 'px';
			cardClone.style.width = width + 'px';
			cardClone.style.height = height + 'px';
			// hide the original card with opacity
            card.style.opacity = '0';
			// add card to the same container
			card.parentNode.appendChild(cardClone);
			// create a close button to handle the undo
			const closeButton = document.createElement('button');
            // position the close button top corner
            
            ////// mybe creat the map after----->
			closeButton.style = `
                position: absolute;
				z-index: 15;
				top: 10px;
				right: 10px;
				width: 15px;
				height: 15px;
				border-radius: 50%;
                background-color: #e25656;
                outline: none;
                border: none;
                cursor: pointer;
			`;
			// attach click event to the close button
			closeButton.addEventListener('click', async () => {
				// remove the button on close
				closeButton.remove();
				// remove the display style so the original content is displayed right
				cardClone.style.removeProperty('display');
				cardClone.style.removeProperty('padding');
				// show original card content
				[...cardClone.children].forEach(child => child.style.removeProperty('display'));
				fadeContent(cardClone, '0');
				// shrink the card back to the original position and size
				await toggleExpansion(cardClone, {top: `${top}px`, left: `${left}px`, width: `${width}px`, height: `${height}px`}, 300)
				// show the original card again
				card.style.removeProperty('opacity');
				// remove the clone card
				cardClone.remove();
			});
			// fade the content away
			fadeContent(cardClone, '0')
				.then(() => {
					[...cardClone.children].forEach(child => child.style.display = 'none');
				});
			// expand the clone card
			await toggleExpansion(cardClone, {top: "0", left: "auto", width: '100%', height: 'auto'});
			const content = getCardContent(mapInfo[cardDataIndex].curessTitle, mapLat, mapLon)
            // set the display block so the content will follow the normal flow in case the original card is not display block
            
            cardClone.style = ` 
                                position: absolute;
            
                                display: flex;
                                padding: 0;
                                background:  #333;
                                color: #ffffff;
                                z-index: 10;
                                opcity: 1; 
                                -webkit-flex-wrap: wrap;
                                flex-wrap: wrap;
                                `
            
			// append the close button after the expansion is done
			cardClone.appendChild(closeButton);
			cardClone.insertAdjacentHTML('afterbegin', content);
			
			createMap(cardDataIndex);
		};

        
        


 cards.forEach(card => card.addEventListener('click', onCardClick));
        
        
