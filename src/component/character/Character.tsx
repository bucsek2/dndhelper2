import React from 'react';
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { Spinner } from 'primereact/spinner';
import { Button } from 'primereact/button';
import "./Character.scss";

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
        const forage = <div className="forage-panel">
            <div className="survival">
                <div className="survival-label">Survival</div>
                <Spinner value={this.props.survival} onChange={e=> this.updateSurvival(e.value)} formatInput={true} decimalSeparator={','} thousandSeparator={' '} min={-30} max={30}/>
            </div>
            <div className="wisdom">
                <div className="wisdom-label">Wisdom</div>
                <Spinner value={this.props.wisdom} onChange={e=> this.updateWisdom(e.value)} formatInput={true} decimalSeparator={','} thousandSeparator={' '} min={-30} max={30}/>
            </div>
        </div>;

        return (
            <Panel header={this.props.name} className="character">
                <Button className="remove-button" label="X" onClick={e=> this.props.onRemove(this.props.id)}/>
                <div className="forage">
                    <span className="forage-label">Forage</span>
                    <Checkbox className="forage-box" onChange={e=> this.updateForage(e.checked)} checked={this.props.forage}/>
                </div>
                {this.props.forage &&
                    forage
                }           
            </Panel>
        );
    }
}
