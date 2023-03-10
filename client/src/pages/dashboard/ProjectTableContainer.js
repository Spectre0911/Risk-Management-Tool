import React, { Fragment, useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filters";
import { CgSortAz, CgSortZa } from "react-icons/cg";
import { MdSort } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { GrClose } from "react-icons/gr";
import FeatureForm from "./FeatureForm";
const TableContainer = ({
  columns,
  data,
  renderRowSubComponent,
  fetchProjectFunction,
}) => {
  const navigate = useNavigate();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (
      column.isSortedDesc ? (
        <CgSortAz />
      ) : (
        <CgSortZa />
      )
    ) : (
      ""
    );
  };

  const onChangeInSelect = (event) => {
    setPageSize(10);
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  useEffect(() => {
    setPageSize(5);
  }, []);

  const [showAdd, setShowAdd] = useState(false);
  const handleAddClose = () => {
    setShowAdd(false);
  };

  const handleAddShow = () => {
    setShowAdd(true);
  };

  return (
    <Fragment>
      <div className="projectFilterRow">
        <input
          className="projectFilterInput"
          placeholder="Search by project name"
          onChange={(e) => setFilter("projectName", e.target.value)}
        />
        <input
          className="projectFilterInput"
          placeholder="Search by project manager"
          onChange={(e) => setFilter("projectManager", e.target.value)}
        />
        <button
          onClick={handleAddShow}
          className="projectFilterInput viewProject addFeatureButton"
        >
          Create Project
        </button>
      </div>
      <div className="projectTableContainer">
        <Table bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <div className="sortIcon">
                        {generateSortingIndicator(column) ? (
                          generateSortingIndicator(column)
                        ) : (
                          <MdSort />
                        )}
                      </div>
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              {
                /* {console.log(row)} */
              }
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr
                    onClick={() =>
                      navigate(`/projects/${row.original.projectId}`)
                    }
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Row
        className="projectTableControls"
        style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}
      >
        <Col md={3}>
          <Button
            className="projectTableNextButton"
            color="primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            className="projectTableNextButton"
            color="primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {"<"}
          </Button>
        </Col>
        <Col className="projectTableNextPageNumber" md={2}>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            className="projectTableNextButton"
            type="number"
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={4}>
          <Button
            color="primary"
            className="projectTableNextButton"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {">"}
          </Button>
          <Button
            className="projectTableNextButton"
            color="primary"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </Col>
      </Row>

      <Modal
        className="addProfileModal"
        style={{ marginTop: "100px" }}
        fade={false}
        show={showAdd}
        onHide={handleAddClose}
      >
        <Modal.Header>
          <div className="bugFormClose" onClick={handleAddClose}>
            <GrClose />
          </div>
          <Modal.Title>Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FeatureForm
            fetchProjectFunction={fetchProjectFunction}
            handleClose={handleAddClose}
          />
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default TableContainer;
