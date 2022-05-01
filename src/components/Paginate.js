import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Paginate({page,pages ,keyword='',isAdmin=false}) {

    if (keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    console.log('Keyword:',page)
  return (
    //   <Pagination>
    //       <Pagination.Item>
    //           4 5 6
    //       </Pagination.Item>
    //   </Pagination>
      pages>1 && (
        <Pagination>
        {[...Array(pages).keys()].map((x) => ( // 0,1,2,3 totol Pages=4
            <LinkContainer
                key={x + 1}  // not 0 so + 1 =1
                to={!isAdmin ?
                    `/?keyword=${keyword}&page=${x + 1}`
                    : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                }
            >
                <Pagination.Item active={x + 1===page}>{x + 1}</Pagination.Item>
            </LinkContainer>
        ))}
    </Pagination>
      )
  )
}

export default Paginate