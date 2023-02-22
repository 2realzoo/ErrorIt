package com.errorit.erroritoverflow.app.member.repository;

import com.errorit.erroritoverflow.app.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
<<<<<<< HEAD
    List<Member> findByEmail(String email);

    Member findByMemberId(Long memberId);
=======
    Optional<Member> findByEmail(String email);
>>>>>>> 268ec19222f0ec35b8d94060512cf577fe809167
}
