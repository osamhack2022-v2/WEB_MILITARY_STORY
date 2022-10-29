import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import VacaAccordion from './VacaAccordion';

const StyledDiv = styled.div`
  margin-top: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  border: 2px solid #2f9658;
  padding: 20px;
`;

const ColoredTitle = styled.div`
  color: #777;
  font-size: 25px;
`;

const ColoredDiv = styled.div`
  color: #777;
  font-size: 18px;
  display: flex;
`;

function MyVacation({ sendEditVacation }) {
  const [content, onChangeContent, setContent] = useInput('');
  const { me } = useSelector((state) => state.user);

  return (
    <StyledDiv>
      <div style={{ color: '#1B3B1A', fontSize: '25px', marginBottom: 10 }}>
        총 휴가 :{' '}
        {me.annual + me.reward + me.compensation + me.consolation + me.petition}
      </div>
      <VacaAccordion category="0" editVa={sendEditVacation} />
      <br />
      <VacaAccordion category="1" editVa={sendEditVacation} />
      <br />
      <VacaAccordion category="2" editVa={sendEditVacation} />
      <br />
      <VacaAccordion category="3" editVa={sendEditVacation} />
      <br />
      <VacaAccordion category="4" editVa={sendEditVacation} />
    </StyledDiv>
  );
}

MyVacation.propTypes = {
  sendEditVacation: PropTypes.func.isRequired,
};

export default MyVacation;
