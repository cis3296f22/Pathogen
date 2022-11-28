import styled from 'styled-components'

export default class SliderStyles {
	static readonly SliderContainer = styled.div<{labelName: boolean}>`
        display: grid;
        grid-template-columns: ${props => props.labelName ? '50% 50%' : '100%'};
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > p {
            text-align: left;
            line-height: 100%;
            width: 100%;
            margin: 0;
            font-size: calc(var(--vh) * .009);
        }
	`
}
