import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import PostSearchInput from "../components/NoticeBoard/PostSearchInput";
import PostList from "../components/NoticeBoard/PostList";
//import Loading from "../components/Loading/Loading";

const NoticeBoardPage = () => {
  const userPostSearchValue = useRef(null);
  const [postList, setPostList] = useState([]);
  const [totalPostLength, setTotalPostLength] = useState(
    []
  );

  //const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const POST_PER_PAGE = 5;

  const getPostList = async () => {
    //setIsLoading(true);

    try {
      const response = await axios.get(
        `/api/posts/getPostList?pageNumber=${pageNumber}
                &search=${userPostSearchValue.current.value}`
      );

      if (response) {
        const getPosts = response.data.list;
        const getTotalPostsLength =
          response.data.totalPostLength;

        if (getPosts) {
          setPostList(getPosts);
          setTotalPostLength(getTotalPostsLength);
        }
      }

      //setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitGetFilteredPostList = async e => {
    e.preventDefault();

    try {
      await getPostList();
      setPageNumber(1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <>
      <PostSearchInput
        userPostSearchValue={userPostSearchValue}
        onSubmitGetFilteredPostList={
          onSubmitGetFilteredPostList
        }
      />

      <PostList
        postList={postList}
        postPerPage={POST_PER_PAGE}
        totalPostLength={totalPostLength}
        paginate={setPageNumber}
        pageNumber={pageNumber}
      />
    </>
  );
};

export default NoticeBoardPage;
