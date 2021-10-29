const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '24080783-03e8685994000525a28035f2f';

export default class FetchService {
    constructor() {
        this.searchParam = '';
        this.page = 1;
    }

    fetchImg() {
        console.log('this',this);
   return fetch(`${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchParam}&page=${this.page}&per_page=12&key=${API_KEY}`)
       .then(responce => 
           responce.json()
   )
       
       .then(data => {
           if (data.total != 0) {
                this.incrementPage();
            //    console.log('after', this);
               return data.hits;
               
           }
    
               console.log('Mistake');
               return
           
       })
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
}

    get query() {
        return this.searchParam;
    }
    set query(newSearchParam) {
        this.searchParam = newSearchParam;
    }
}