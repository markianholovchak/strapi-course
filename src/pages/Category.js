import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      name
      id
      reviews {
        title
        id
        Body
        rating
        categories {
          name
          id
        }
      }
    }
  }
`;
export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oopss! Error here</p>;

  return (
    <div>
      <h2>{data.category.name}</h2>
      {data.category.reviews.map((review) => {
        return (
          <div key={review.id} className="review-card">
            <div className="rating">{review.rating}</div>
            <h2>{review.title}</h2>
            {review.categories.map((c) => {
              return <small key={c.id}>{c.name}</small>;
            })}

            <p>{review.Body.substring(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read more</Link>
          </div>
        );
      })}
    </div>
  );
}
