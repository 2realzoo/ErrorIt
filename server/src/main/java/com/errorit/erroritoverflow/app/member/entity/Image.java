package com.errorit.erroritoverflow.app.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Image {

    @Id
    @GeneratedValue
    @Column(name = "IMAGE_ID")
    private long id;

    private String url;

    protected Image() {
    }
}
