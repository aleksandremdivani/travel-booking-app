export const FeaturesCard = ({title, text, icon, isBottomCard}) => {
    return (
          <div className={`lg:w-30/100 border border-gray-300 w-full shadow-lg rounded-xl ${isBottomCard? "sm:w-7/10" : "sm:w-48/100"} flex pt-2 pb-6 px-4 gap-4 align-stretch`}>
            <div className="pt-2">
                {icon}
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <h3 className="font-semibold text-[22px]">{title}</h3>
              <p className="text-[18px]">
                {text}
              </p>
            </div>
          </div>
    )
}