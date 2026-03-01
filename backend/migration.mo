import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  type Currency = {
    #USD;
    #INR;
    #JPY;
  };

  type Category = Text;

  type Expense = {
    id : Text;
    amount : Nat;
    category : Category;
    date : Text;
    note : ?Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type OldActor = {
    expenses : Map.Map<Text, Expense>;
  };

  type NewActor = {
    expenses : Map.Map<Text, Expense>;
    preferredCurrency : Currency;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      preferredCurrency = #USD
    };
  };
};
