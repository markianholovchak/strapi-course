import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title
      Body
      rating
      id
      categories {
        name
        id
      }
    }
  }
`;

export default function Homepage() {
  const { loading, error, data } = useQuery(REVIEWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oopss! Error here</p>;

  return (
    <div>
      {data.reviews.map((review) => {
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
