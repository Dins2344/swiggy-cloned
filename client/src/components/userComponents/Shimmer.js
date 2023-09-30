import "./app.css";

const ShimmerCard = () => {
  return (
    <>
      <div className="card">
        <div className="shimmerImage"></div>
        <div className="shimmerHeading"></div>
        <div className="shimmerHeadingTwo"></div>
      </div>
    </>
  );
};

const Shimmer = () => {
    const shimData = Array.from({length:12})
  return (
    <div className="cardsBodyOne">
      <div className="cardsBody">
      {  shimData.map((item,index)=>{
            return  <ShimmerCard key = {index} />
        })}
      </div>
    </div>
  );
};

export default Shimmer;
