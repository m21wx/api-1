		//'https://mp3quran.net/api/v3/reciters?language=ar'
		
	let TheHolyQuran ='https://www.mp3quran.net/api/v3/';
	let searchQuran = 'languages' ;
	let languages = 'ar';
		
// القراء reciters
// السور suwar

	let nameTitle = document.querySelector('#nameTitle')
	let nameٌٌReciters = document.querySelector('#nameٌٌReciters')
	let nameٌٌSuwar = document.querySelector('#nameٌٌSuwar')


	

	
	 // القراء
	 async function myQrounReciters(a){
		 let getQrurn = await fetch(`https://www.mp3quran.net/api/v3/${a}?language=ar`);
		 let arr = await getQrurn.json();
		 let dataRs = arr.reciters

	
			for(info in dataRs){
			
				let optionR=`<option value=${dataRs[info].id}>${dataRs[info].name} </option>`;
				nameٌٌReciters.innerHTML+= optionR;
				}

				
			nameٌٌReciters.addEventListener('change',(e)=>{
			
				myQrounRiwayat(e.target.value)
			
			})
		
	 }
	   myQrounReciters('reciters')
	 

	async function myQrounRiwayat(nameReciters){
		let getRiwayat= await fetch(`https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${nameReciters}`);
		let arr = await getRiwayat.json();
		let date = arr.reciters[0].moshaf;
	
	

			nameTitle.innerHTML=`<option> اختر رواية</option>`;
			date.forEach(e=>{	

				nameTitle.innerHTML+=`
				<option
					value='${e.id}'
					data-server='${e.server}'
					data-surahlist="${e.surah_list}"> ${e.name}</option>
				`;
			})
			
		nameTitle.addEventListener('change',(e)=>{
			
				const selectedMosfah =nameTitle.options[nameTitle.selectedIndex]
				let url = selectedMosfah.dataset.server ;
				let numberS  = selectedMosfah.dataset.surahlist ;
		
			myQrounSuwar(url , numberS)
	
		})
	}
	  // السور suwar
	 async function myQrounSuwar(server,surahlist){
		 let getQrurn = await fetch(`https://www.mp3quran.net/api/v3/suwar?language=ar`);
		 let arr = await getQrurn.json();
		 let dataSu = arr.suwar;
			nameٌٌSuwar.innerHTML='<option> اختر السوره </option>';
		surahlist.split(',').forEach(e=>{

			dataSu.forEach(s=>{

				if(s.id  == e){
					nameٌٌSuwar.innerHTML+=`<option value='${s.id }'> ${s.name}</option>`;
				}
			})
		})
		nameٌٌSuwar.addEventListener('change',(e)=>{
			let optionSelect = nameٌٌSuwar.options[nameٌٌSuwar.selectedIndex];
		
			let numberٌٌSuwar = optionSelect.value;
			let numberٌٌSuwarMedia = numberٌٌSuwar.padStart(3,'0');
			audio(`https://server9.mp3quran.net/akrm/${numberٌٌSuwarMedia}.mp3`);
	
		})
		
	 }
	 
	 
	  
	  // الصوت
	  
	  function audio(url){
		  let audio = document.querySelector('audio');
		
				audio.src = url;
	  }

	

	 
	 
	 
	 
	 
	 

	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 