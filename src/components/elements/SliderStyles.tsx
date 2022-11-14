import styled from 'styled-components'

export default class SliderStyles {
	static readonly SliderContainer = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        & > p {
            line-height: 100%;
            margin: 0;
        }
	`
}
