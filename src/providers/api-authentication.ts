import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiAuthentication provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

var categoryCache = {};

@Injectable()
export class ApiAuthentication {

    // Details Page
    details: any;

	constructor(public http: Http) {
		console.log('Hello ApiAuthentication Provider');
	}

	// Category pages
	/////////////////////////////////////////////////////////////////////

	 perpage: number = 50;

	 loadCategory(category:any) {
	 	var url = "http://api.yummly.com/v1/api/recipes?_app_id=397aed16&_app_key=69e2565adcec7a6609b18bef31261e62";

	 	if (categoryCache[category.categoryId]) {
	 	  // already loaded data
	 	  return Promise.resolve(categoryCache[category.categoryId]);
	 	}

	 	// don't have the data yet
	 	return new Promise(resolve => {
	 	  // We're using Angular HTTP provider to request the data,
	 	  // then on the response, it'll map the JSON data to a parsed JS object.
	 	  // Next, we process the data and resolve the promise with the new data.
	 	  var params = "";

	 	  category.apiParams.forEach(paramPair => {
	 	  	params += "&" + paramPair.key + '=' + paramPair.value;
	 	  });

	 	  this.http.get(url + params + "&maxResult=" + this.perpage + '&requirePictures=true')
	 	    .map(res => res.json())
	 	    .subscribe(data => {
	 	      // we've got back the raw data, now generate the core schedule data
	 	      // and save the data for later reference
	 	      console.log(data);
	 	      console.log(this.http.get);
	 	      categoryCache[category.categoryId] = data.matches;
	 	      resolve(categoryCache[category.categoryId]);
	 	    });
	 	});
	 }

	// Details
	/////////////////////////////////////////////////////////////////////

	loadDetails(id) {

		console.log('load details' + id);
		let url = 'http://api.yummly.com/v1/api/recipe/' + id + '?_app_id=397aed16&_app_key=69e2565adcec7a6609b18bef31261e62'; + console.log(url);

	  	if (this.details) {
	    	return Promise.resolve(this.details);
	  	}

	  	return new Promise(resolve => {
			this.http.get(url)
	      	.map(res => res.json())
		  	.subscribe(data => {
		    	console.log(data);
	        	this.details = data;
	        	resolve(this.details);
		  	});
	  	});
	}

	// Search
	/////////////////////////////////////////////////////////////////////

	static get parameters() {
        return [[Http]];
    }

	searchRecipesByIngredients(ingredients:string[]){
		var params = "";

		ingredients.forEach((ingredient, index) => {
			if(ingredient.startsWith('!')){
				params += '&excludedIngredient[]=' + encodeURI(ingredient.substring(1).toLowerCase())
			}else{
				params += '&allowedIngredient[]=' + encodeURI(ingredient.toLowerCase())
			}
		});

	  let url = 'http://api.yummly.com/v1/api/recipes?_app_id=397aed16&_app_key=69e2565adcec7a6609b18bef31261e62&maxResult=50&requirePictures=true' + params;
      var response = this.http.get(url).map(res => res.json());
      return response;
	}
}
