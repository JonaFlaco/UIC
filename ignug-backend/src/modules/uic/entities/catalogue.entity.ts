import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  EnrollmentEntity,
  TutorAssignmentEntity,
  EventEntity,
  ProjectPlanEntity,
  ModalityEntity,
} from '@uic/entities';

@Entity('catalogues', { schema: 'uic' })
export class CatalogueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @ManyToOne(() => CatalogueEntity, (category) => category.children)
  parent: CatalogueEntity;

  @OneToMany(() => CatalogueEntity, (category) => category.parent)
  children: CatalogueEntity[];

  //event
  @OneToMany(() => EventEntity, (event) => event.name)
  events: EventEntity[];
  //projectPlan
  @OneToMany(() => ProjectPlanEntity, (projectPlan) => projectPlan.state)
  projectPlans: ProjectPlanEntity[];
  //enrollment
  @OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.catalogue)
  enrollments: EnrollmentEntity[];
  //tutor assignment
  @OneToMany(
    () => TutorAssignmentEntity,
    (tutorAssignment) => tutorAssignment.type,
  )
  tutorAssignments: TutorAssignmentEntity[];
  //modality
  // @OneToMany(() => ModalityEntity, (modality) => modality.state)
  // states: ModalityEntity[];

  @Column('varchar', {
    name: 'name',
    comment: 'Nombre del catalogo',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    comment: 'Descripcion del catalogo',
  })
  description: string;

  @Column('boolean', {
    name: 'state',
    default: true,
    comment: 'true=activo, false=no activo',
  })
  state: boolean;

  @Column('varchar', {
    name: 'type',
    comment: 'Tipo de catalogo',
  })
  type: string;

  @Column('varchar', {
    name: 'code',
    comment: 'Codigo del catalogo',
  })
  code: string;

  @BeforeInsert()
  @BeforeUpdate()
  setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase().trim();
  }
}
