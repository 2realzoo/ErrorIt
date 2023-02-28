package com.errorit.erroritoverflow.app.image.entity;

import com.errorit.erroritoverflow.app.audit.Auditable;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Image extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IMAGE_ID")
    private long id;

    @Column
    private String url;
}
