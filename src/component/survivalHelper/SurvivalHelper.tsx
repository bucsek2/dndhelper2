import React from 'react';
import { CharacterModel, Character } from '../character/Character';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Spinner } from 'primereact/spinner';
import { Dice } from '../../util/Dice';

export interface SurvivalHelperState {
    characters: CharacterModel[];
    newCharacterName: string;
    forageDC: number;
    startingFood: number;
    currentFood: number;
    daysPassed: number;
}

export class SurvivalHelper extends React.Component<{}, SurvivalHelperState> {
    constructor(props: any) {
        super(props);
    
        this.state = {
            forageDC: 10,
            characters: [],
            newCharacterName: "",
            currentFood: 0,
            daysPassed: 0,
            startingFood: 0
        }
    
        this.addCharacter = this.addCharacter.bind(this);
        this.updateCharacterName = this.updateCharacterName.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);
        this.updateStartingFood = this.updateStartingFood.bind(this);
        this.andvanceDay = this.andvanceDay.bind(this);
        this.removeCharacter = this.removeCharacter.bind(this);
      }
    
      private addCharacter() {
        let updated = this.state.characters;
        let count = this.state.characters.length;
    
        let name;
        if(this.state.newCharacterName) {
          name = this.state.newCharacterName;
        }else {
          name = "NPC " + count;
        }
    
        updated.push({
          id: name,
          name: name,
          survival: 0,
          wisdom: 0,
          forage: true
        });
    
        this.setState({
          characters: updated,
          newCharacterName: ""
        });
      }
    
      private updateCharacterName(event: React.FormEvent<HTMLInputElement>) {
        let target = event.target as HTMLInputElement;
        
        this.setState({
          newCharacterName: target.value
        });
      }
    
      private updateCharacter(character: CharacterModel){
        let found = this.state.characters.find(c => {return c.id === character.id});
    
        if(!found){
          return;
        }
    
        let index = this.state.characters.indexOf(found);
        let forUpdate = this.state.characters;
        forUpdate[index] = character;
        this.setState({
          characters: forUpdate
        });
      }

      private removeCharacter(id: string): void {
        let found = this.state.characters.find(c => {return c.id === id});
        if(!found){
          return;
        }
        let index = this.state.characters.indexOf(found);

        let forUpdate = this.state.characters;
        forUpdate.splice(index, 1);
        this.setState({
            characters: forUpdate
        });
      }
    
      private updateStartingFood(event: React.FormEvent<HTMLInputElement>){
        let target = event.target as HTMLInputElement;
        
        this.setState({
            startingFood: +target.value,
            currentFood: +target.value,
            daysPassed: 0
        });
      }

      private andvanceDay(){
        let foodConsumption = this.state.characters.length;

        let foragedFood = this.state.characters.map(c=> {
            if(c.forage === false){
                return 0;
            }

            let foraged = 0;
            if(this.state.forageDC < (Dice.d20() + c.survival)){
                foraged = Dice.d6() + c.wisdom;
            }
            return foraged;
        }).reduce( (a, b) => a + b );

        this.setState( state => ({
            currentFood: state.currentFood - foodConsumption + foragedFood,
            daysPassed: state.daysPassed + 1
        }));
      }

      render() {
        let jsxCharacters: JSX.Element[] = [];
    
        for(let character of this.state.characters){
          jsxCharacters.push(<Character key={character.id} onChange={this.updateCharacter} name={character.name} wisdom={character.wisdom} survival={character.survival} forage={character.forage} id={character.id} onRemove={this.removeCharacter}/>);
        }

        let advanceAvailable = jsxCharacters.length < 1;
    
        return (
          <div className="survival-helper">
              <div className="header">
                <span>Forage DC</span>
                <Spinner formatInput={true} decimalSeparator={","} thousandSeparator={" "} value={this.state.forageDC} onChange={e=> this.setState({forageDC: e.value})} min={8} max={30}/>
                <span>Starting Food</span>
                <InputText value={this.state.startingFood} keyfilter={'int'} onChange={this.updateStartingFood}/>
                <span>Days Passed: {this.state.daysPassed}</span>
                <span>Current Food: {this.state.currentFood}</span>
                <Button label={"Advance Day!"} onClick={this.andvanceDay} disabled={advanceAvailable}/>
              </div>
            {jsxCharacters}
            <div>
              <InputText value={this.state.newCharacterName} onChange={this.updateCharacterName} />
              <Button label="Click" onClick={this.addCharacter}/>
            </div>
          </div>
        );
      }
}