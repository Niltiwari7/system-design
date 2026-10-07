import MemberType from "../enums/memberType";

class Member {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly memberType: MemberType,
  ) {}
}

export default Member;
