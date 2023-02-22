package com.errorit.erroritoverflow.app.member.repository;

import com.errorit.erroritoverflow.app.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {
    List<Member> findAllByEmail(String email);
}
