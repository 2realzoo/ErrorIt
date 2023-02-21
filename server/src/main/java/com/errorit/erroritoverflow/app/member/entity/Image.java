package com.errorit.erroritoverflow.app.member.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Image extends Auditable {

    @Id
    @GeneratedValue
    @Column(name = "IMAGE_ID")
    private long id;

    private String url;

    protected Image() {
    }
}
