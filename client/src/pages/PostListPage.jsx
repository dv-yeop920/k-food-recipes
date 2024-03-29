import styles from "components/PostList/PostList.module.scss";
import button from "styles/Button.module.scss";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostList } from "services/post.services";
import ScrollToTop from "utils/scrollTop";
import useAuth from "hooks/useAuth";
import Post from "components/PostList/Post";
import Pagenate from "components/PagiNation/Pagenate";
import NotFound from "components/NotFound/NotFound";

const PostPage = () => {
  const { authAndNavigate } = useAuth("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get("search");
  const pageParam = searchParams.get("page");

  const onClickPageNumber = pageNumber => {
    setSearchParams({
      page: pageNumber,
      search: searchParam,
    });
  };

  const { data } = useQuery({
    queryKey: ["postList", searchParam, pageParam],
    queryFn: () => getPostList(searchParam, pageParam),
    staleTime: Infinity,
  });

  return (
    <main className="back-ground">
      <ScrollToTop tabParam={pageParam} />

      <section
        className={`${styles.board_container} inner-box`}
        aria-label="게시물 섹션"
      >
        <div className={styles.write_button_box}>
          <button
            className={button.submit}
            onClick={() => {
              authAndNavigate("/writing");
            }}
          >
            글쓰기
          </button>
        </div>
        <ul className={styles.ul}>
          {data?.postList?.map(post => {
            return <Post key={post._id} post={post} />;
          })}

          {data?.postList?.length === 0 && <NotFound />}
        </ul>

        {data?.postList?.length > 0 && (
          <Pagenate
            onClickPageNumber={onClickPageNumber}
            totalPostLength={data.totalPostLength}
            pageParam={pageParam}
          />
        )}
      </section>
    </main>
  );
};

export default PostPage;
