import React from 'react'


export default class DocumentationContainer extends React.Component<{}, {}> {
    render (): React.ReactElement {
        return (
            <>
            <div className="hover_img">
                <a href="Fitness Function">Fitness Function<span><img src={require('../../assets/FitnessFunction.png')} alt="imag"/></span></a>
            </div>
            <div className="hover_img">
                <a href="Testing Report">Genetic Algorithim<span><img src={require('../../assets/GeneticAlgoSudo.png')} alt="imag"/></span></a>
            </div>
            Testing report
            </>
        )
    }
}