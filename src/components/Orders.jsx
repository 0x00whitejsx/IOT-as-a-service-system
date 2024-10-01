import React from 'react';
import styled from 'styled-components';
import scannerIconUrl from "../assets/Animation - 1725675023403.gif";

// Styled components for a polished look
const Container = styled.div`
  text-align: center;
  padding: 50px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', sans-serif;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: #2e3a59;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Subtext = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const Image = styled.img`
  width: 400px;
  height: auto;
  margin-bottom: 2rem;
  display: block;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 30px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Orders = () => {
  return (
    <Container>
      <Heading>Seamless Transactions with CTS</Heading>
      <Subtext>
        We currently can't process your order here. Please use the Customer Terminal Stand (CTS) for a smooth transaction experience.
      </Subtext>
      <Image src={scannerIconUrl} alt="Scanner Icon" />
      <Button>Add Credit Card</Button>
    </Container>
  );
};

export default Orders;
