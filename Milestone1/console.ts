
import * as readline from 'readline-sync';
import express from "express";
import ejs from "ejs";
import { Car , CarModel, cars , Owner, ownerCar } from './interface';


function viewAllData(): void{
    for (let car of cars) {
        console.log(`ID: ${car.id}`);
        console.log(`Name: ${car.name}`);
        console.log(`Description: ${car.description}`);
        console.log(`Age: ${car.age}`);
        console.log(`Status: Active`);
        console.log(`Birthdate: ${car.birthdate}`);
        console.log(`Image URL: ${car.imageUrl}`);
        console.log(`Status: ${car.status}`);  
        console.log(`features: ${car.features}`)
        console.log(`Make: ${car.model?.make}`);
        console.log(`Model: ${car.model?.name}`);
        console.log(`Year: ${car.model?.year}`);
        console.log(`Color: ${car.model?.color}`);
        console.log("-------------------------------------")
}
}

function filterById(): void {
  let id: number = parseInt(readline.question("Please enter the ID you want to filter by: "));
  let car = cars.find(car => car.id === id);

  if (car) {
    console.log(`Car filtered by ID: ${id}`)
    console.log(`ID: ${car.id}`);
    console.log(`Name: ${car.name}`);
    console.log(`Description: ${car.description}`);
    console.log(`Age: ${car.age}`);
    console.log(`Status: Active`);
    console.log(`Birthdate: ${car.birthdate}`);
    console.log(`Image URL: ${car.imageUrl}`);
    console.log(`Status: ${car.status}`);  
    console.log(`features: ${car.features}`)
    console.log(`Make: ${car.model?.make}`);
    console.log(`Model: ${car.model?.name}`);
    console.log(`Year: ${car.model?.year}`);
    console.log(`Color: ${car.model?.color}`);
    console.log("-------------------------------------")
  }
  else{
    console.log("No car found with that ID.")
  }
}


let running = true;
while (running) {

    console.log("Welcome to the JSON data viewer!")
    console.log('1. View all data');
    console.log('2. Filter by ID');
    console.log('3. Exit');
    
    let choices : string[] = ["View all data", "Filter by ID", "Exit"];
    let index : number = readline.keyInSelect(choices, "Please enter your choice");
    
    
    if (index !== -1) {
        let chosenOption: string = choices[index];
        console.log(`You chose: ${chosenOption}`);
    
        switch (chosenOption) {
            case "View all data":
                console.log("Viewing all data...");
                viewAllData();
                break;
            case "Filter by ID":
                filterById();
                break;
            case "Exit":
                console.log("Exiting...");
                running = false;
                break;
            default:
                console.log("Invalid choice.");
                break;
        }
    }
    }
