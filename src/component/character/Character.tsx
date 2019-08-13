import React from 'react';
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Spinner } from 'primereact/spinner';
import { Button } from 'primereact/button';

export interface CharacterProps extends CharacterModel {
    onChange: (state: CharacterModel)=>void
    onRemove: (id: string) => void
}

export interface CharacterModel {
    id: string;
    name: string;
    survival: number;
    wisdom: number;
    forage: boolean;
}

export class Character extends React.Component<CharacterProps, {}> {
    constructor(props: CharacterProps) {
        super(props);

        this.updateForage = this.updateForage.bind(this);
        this.updateSurvival = this.updateSurvival.bind(this);
        this.updateWisdom = this.updateWisdom.bind(this);
    }

    private updateSurvival(survival: number){
        this.updateCharacter({
            id: this.props.id,
            forage: this.props.forage,
            name: this.props.name,
            survival: survival,
            wisdom: this.props.wisdom
        });
    }

    private updateWisdom(wisdom: number){
        this.updateCharacter({
            id: this.props.id,
            forage: this.props.forage,
            name: this.props.name,
            survival: this.props.survival,
            wisdom: wisdom
        });
    }

    private updateForage(forage: boolean){
        this.updateCharacter({
            id: this.props.id,
            forage: forage,
            name: this.props.name,
            survival: this.props.survival,
            wisdom: this.props.wisdom
        });
    }

    private updateCharacter(character: CharacterModel){
        this.props.onChange(character);
    }

    render() {
        console.log("render "+this.props.name);
        
        let forage: JSX.Element[] = []

        forage.push(<span>Survival</span>)
        forage.push(<Spinner value={this.props.survival} onChange={e=> this.updateSurvival(e.value)} formatInput={true} decimalSeparator={','} thousandSeparator={' '} min={-30} max={30}/>)
        forage.push(<span>Wisdom</span>)
        forage.push(<Spinner value={this.props.wisdom} onChange={e=> this.updateWisdom(e.value)} formatInput={true} decimalSeparator={','} thousandSeparator={' '} min={-30} max={30}/>)

        return (
            <Panel header={this.props.name}>
                <span>Forage </span><Checkbox onChange={e=> this.updateForage(e.checked)} checked={this.props.forage}/>
                <Button label="-" onClick={e=> this.props.onRemove(this.props.id)}/>
                {this.props.forage &&
                    forage
                }           
            </Panel>
        );
    }
}
