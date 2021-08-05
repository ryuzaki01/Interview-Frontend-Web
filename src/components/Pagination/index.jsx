import React from 'react';
import { Link } from '@tiket-com/react-ui';
import { useHistory } from 'react-router-dom';
import { string, number, object, func, bool } from 'prop-types';

import useData from '../../hooks/useData';

import { stringifyQuery, range } from '../../core/utils';

import './style.scss';

const Pagination = (props) => {
  const { lastPage, onSet = () => {} } = props;
  const [{ app }] = useData();
  const { query, pathname } = app || {};
  const { p: currentPage = 1 } = query || {};
  const history = useHistory();

  const paginate = (curPage, pageCount) => {
    const adjacents = 3;
    const currentPage = Number(curPage);

    const rangeWithDots = [];

    rangeWithDots.unshift(currentPage);

    range(adjacents).forEach(function (val) {
      const page = (currentPage - (val + 1));

      /*istanbul ignore next*/
      if (page > 0) {
        rangeWithDots.unshift(page);
      }
    });

    range(adjacents).forEach(function (val) {
      const page = (currentPage + val + 1);

      /*istanbul ignore next*/
      if (page <= pageCount) {
        rangeWithDots.push(page);
      }
    });

    return rangeWithDots;
  };

  const handlePagination = (page) =>{
    history.push({
      pathname: pathname,
      search: `?${stringifyQuery({
        ...query,
        p: page
      })}`
    });

    onSet({
      query: {
        page
      }
    })
  };

  const paginated = paginate(currentPage, lastPage);

  /*istanbul ignore next*/
  if (paginated.length <= 1) {
    return (
      <div className="pagination" />
    );
  }

  /*istanbul ignore next*/
  return (
    <div className="pagination">
      <ul>
        {currentPage > 1 && (
          <li className="previous" onClick={() => handlePagination(parseInt(currentPage || 1, 10) - 1)} to="#">
            ◀
          </li>
        )}
        {(paginated || []).map((p, i) => {
          const isDisabled = parseInt(currentPage, 10) === p || p === "...";
          const link = p === "..." || isDisabled ? '#!' : `${pathname}?${stringifyQuery({ ...query, p: p })}`;

          return (
            <li className={isDisabled ? 'active' : ''} key={`paginate-${i}`}>
              <Link to={link} onClick={() => handlePagination(p)}>{p}</Link>
            </li>
          )
        })}
        {currentPage < lastPage && (
          <li className="next"  onClick={() => handlePagination(parseInt(currentPage || 1, 10) + 1)} to="#">
            ▶
          </li>
        )}
      </ul>
    </div>
  )
};

Pagination.propTypes = {
  currentPage: number,
  lastPage: number,
  onSet: func,
  log: bool
};

export default Pagination;
