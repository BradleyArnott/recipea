import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Categories {
	private categories = [
		{
			categoryId: 1,
			categoryName: "Gluten Free",
			apiParams: [
				{ key: "allowedAllergy[]", value: "396^Dairy-Free" },
				{ key: "allowedAllergy[]", value: "393^Gluten-Free" },
				{ key: "requirePictures", value: true }
			]
		},
		{
			categoryId: 2,
			categoryName: "Under 30 Minutes",
			apiParams: [{ key: "maxTotalTimeInSeconds", value: 1800}]
		},
		{
			categoryId: 3,
			categoryName: "Yummmy Deserts",
			apiParams: [{key: "allowedCourse[]", value: "course^course-Desserts" }]
		},
		{
			categoryId: 4,
			categoryName: "Thai",
			apiParams: [{ key: "allowedCuisine[]", value:  "cuisine^cuisine-thai"}]
		},
		{
			categoryId: 5,
			categoryName: "Vegan",
			apiParams: [{ key: "allowedDiet[]", value: "386^Vegan"}]
		},
		{
			categoryId: 6,
			categoryName: "American",
			apiParams: [{ key: "allowedCuisine[]", value: "cuisine^cuisine-american"}]
		},
		{
			categoryId: 7,
			categoryName: "Soups",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Soups"}]
		},
		{
			categoryId: 8,
			categoryName: "4th Of July",
			apiParams: [{ key: "allowedHoliday[]", value: "holiday^holiday-4th-of-july"}]
		},
		{
			categoryId: 9,
			categoryName: "Cocktails",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Cocktails"}]
		},
		{
			categoryId: 10,
			categoryName: "Italian",
			apiParams: [{ key: "allowedCuisine[]", value: "cuisine^cuisine-italian"}]
		},
		{
			categoryId: 11,
			categoryName: "Salads",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Salads"}]
		},
		{
			categoryId: 12,
			categoryName: "Vegetarian",
			apiParams: [{key: "allowedDiet[]", value: "387^Lacto-ovo vegetarian"}]
		},
		{
			categoryId: 13,
			categoryName: "Dairy Free",
			apiParams: [{ key: "allowedAllergy[]", value: "396^Dairy-Free"}]
		},
		{
			categoryId: 14,
			categoryName: "Japanese",
			apiParams: [{ key: "allowedCuisine[]", value: "cuisine^cuisine-japanese"}]
		},
		{
			categoryId: 15,
			categoryName: "Greek",
			apiParams: [{ key: "allowedCuisine[]", value: "cuisine^cuisine-greek"}]
		},
		{
			categoryId: 16,
			categoryName: "Indian",
			apiParams: [{ key: "allowedCuisine[]", value: "cuisine^cuisine-indian"}]
		},
		{
			categoryId: 17,
			categoryName: "Mexican",
			apiParams: [{ key: "allowedCuisine[]", value: "cuisine^cuisine-mexican"}]
		},
		{
			categoryId: 18,
			categoryName: "Lunch and Snacks",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Lunch"}]
		},
		{
			categoryId: 19,
			categoryName: "Main Dishes",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Main Dishes"}]
		},
		{
			categoryId: 20,
			categoryName: "Breads",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Breads"}]
		},
		{
			categoryId: 21,
			categoryName: "Side Dishes",
			apiParams: [{ key: "allowedCourse[]", value: "course^course-Side Dishes"}]
		},
		{
			categoryId: 22,
			categoryName: "Halloween",
			apiParams: [{ key: "allowedHoliday[]", value: "holiday^holiday-halloween"}]
		},
		{
			categoryId: 23,
			categoryName: "Summer",
			apiParams: [{ key: "allowedHoliday[]", value: "holiday^holiday-summer"}]
		},
		{
			categoryId: 24,
			categoryName: "Quick Quick",
			apiParams: [{ key: "maxTotalTimeInSeconds", value: "600"}]
		}
	];

  constructor() {

  }

  all(){
  	return this.categories;
  }

}