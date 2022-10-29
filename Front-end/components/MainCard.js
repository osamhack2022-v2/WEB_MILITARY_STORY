import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import moment from 'moment';
import 'moment/locale/ko';
import PropTypes from "prop-types"

moment.locale('ko');

import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import Link from 'next/link';

const pages = [
  '자유 게시판',
  '고민상담 게시판',
  '정보 게시판',
  '취미 게시판',
  '질문 답변 게시판',
  '감사 게시판',
];

const StyledSpan = styled.span`
  color: #009000;
  font-size: 20px;
  margin-left: 5px;
  margin-bottom: -5px;
  border-radius: 3px;
`;

const StyledDiv = styled.div`
  margin-top: 13px;
  border: 2px solid #2f9658;
  border-radius: 3px;
  background-color: #fefefe;
`;

const PaddingDiv = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 4px;
  padding-right: 5px;
`;

const MainCard = ({ index, posts }) => {
  const { indexPosts } = useSelector((state) => state.post);
  const [indexPost, setIndexPost] = useState([]);
  const dipatch = useDispatch();

  useEffect(() => {
    let _instance = [];
    for (let i = 0; i < indexPosts.length; i++) {
      if (indexPosts[i].category === index) {
        _instance.push(indexPosts[i]);
      }
    }
    setIndexPost(_instance);
  }, [posts]);

  return (
    <StyledDiv>
      <PaddingDiv>
        <StyledSpan>
          <strong>{pages[parseInt(index, 10)]}</strong>
        </StyledSpan>
        <Link href={`/${index}`}>
          <a>
            <strong
              style={{
                float: 'right',
                marginRight: 1,
                color: 'black',
                marginTop: 5,
              }}
            >
              {' '}
              더보기 +
            </strong>
          </a>
        </Link>
      </PaddingDiv>
      <Divider variant="middle" sx={{ bgcolor: '#2F9658' }} />
      {indexPost?.map((el, idx) => (
        <div key={el.id}>
          <Link href={`/post/${el.id}`}>
            <Button
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              {el.content.split('\n$')[0]}
              <p style={{ fontSize: 3 }}>{moment(el.createdAt).fromNow()}</p>
            </Button>
          </Link>
          {idx !== 2 && (
            <Divider variant="middle" sx={{ bgcolor: '#2F9658' }} />
          )}
        </div>
      ))}
    </StyledDiv>
  );
};

MainCard.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
    	id: PropTypes.number.isRequired,
			UserId: PropTypes.number.isRequired,
			category: PropTypes.string.isRequired,
    	content: PropTypes.string.isRequired,
    	createdAt: PropTypes.string.isRequired,
			hidden_mode: PropTypes.bool.isRequired,
			like_counts: PropTypes.number.isRequired,
			private_mode: PropTypes.bool.isRequired,
			report_count: PropTypes.number.isRequired,
    	User: PropTypes.shape({
      	id: PropTypes.number.isRequired,
      	nickname: PropTypes.string.isRequired,
      	followers: PropTypes.number.isRequired,
    	}),
    	Comments: PropTypes.arrayOf(
      	PropTypes.shape({
        	id: PropTypes.number.isRequired,
        	content: PropTypes.string.isRequired,
      	})
    	),
    	Images: PropTypes.arrayOf(
	      PropTypes.shape({
	        id: PropTypes.number.isRequired,
  	      src: PropTypes.string.isRequired,
    	  })
    	),
    	Likers: PropTypes.arrayOf(
      	PropTypes.shape({
        	id: PropTypes.number.isRequired,
        	Like: PropTypes.shape({
	          PostId: PropTypes.number.isRequired,
						UserId: PropTypes.number.isRequired,
						createdAt: PropTypes.string,
						updatedAt: PropTypes.string,
        	})
      	})
    	),
    	Scrappers: PropTypes.arrayOf(
      	PropTypes.shape({
        	id: PropTypes.number.isRequired,
        	Scrap: PropTypes.shape({
	          PostId: PropTypes.number.isRequired,
  	        UserId: PropTypes.number.isRequired,
						createdAt: PropTypes.string,
						updatedAt: PropTypes.string,
        	})
      	})
    	)
  	}).isRequired,
	)
}

export default MainCard;
