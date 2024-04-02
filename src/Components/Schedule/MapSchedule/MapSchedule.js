import MyScheduler from './MySchedule';
import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  .fc {
    background: white;
    padding:40px 20px 40px 20px;
    border-radius: 15px;
  }
`;

function MapSchedule() {

    return (
        <StyleWrapper>
            <MyScheduler />
        </StyleWrapper>
    );
}

export default MapSchedule;
