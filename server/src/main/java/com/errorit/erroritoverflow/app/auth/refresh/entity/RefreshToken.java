package com.errorit.erroritoverflow.app.auth.refresh.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;
import com.errorit.erroritoverflow.app.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class RefreshToken extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REFRESH_TOKEN_ID")
    private Long id;

    @JoinColumn(name = "MEMBER_ID")
    @OneToOne
    private Member member;

    @Column
    private String keyValue;
}
