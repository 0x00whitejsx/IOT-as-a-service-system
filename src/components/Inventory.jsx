import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #0062ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #0050e6;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #f1f1f1;
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #e0e7ff;
  }
`;

const TableData = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const Inventory = ({ inventory, displayedItems, handleAddItem, handleChange, modalIsOpen, openModal, closeModal, currentPage, handleLoadMore, itemsPerPage }) => {
  return (
    <>
      <h2>Inventory</h2>
      <Button onClick={openModal}>Add Item</Button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Add Item</h2>
        <form onSubmit={handleAddItem}>
          <label>Item Name:</label>
          <input type="text" name="itemName" onChange={handleChange} />
          <label>Item Code:</label>
          <input type="text" name="itemCode" onChange={handleChange} />
          <label>Price:</label>
          <input type="number" name="price" onChange={handleChange} />
          <label>Stock:</label>
          <input type="number" name="stock" onChange={handleChange} />
          <Button type="submit">Add</Button>
        </form>
      </Modal>
      <Table>
        <thead>
          <tr>
            <TableHeader>Item Code</TableHeader>
            <TableHeader>Item Name</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Stock</TableHeader>
          </tr>
        </thead>
        <tbody>
          {displayedItems.map(item => (
            <TableRow key={item.itemCode}>
              <TableData>{item.itemCode}</TableData>
              <TableData>{item.itemName}</TableData>
              <TableData>${item.price}</TableData>
              <TableData>{item.stock}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {currentPage * itemsPerPage < inventory.length && <Button onClick={handleLoadMore}>Load More</Button>}
    </>
  );
};

export default Inventory;
